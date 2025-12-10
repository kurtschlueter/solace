import db from "../../../db";
import { advocates } from "../../../db/schema";
import { PAGE_SIZE } from "../../../constants";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || String(PAGE_SIZE));
  const search = searchParams.get("search")?.toLowerCase() || "";

  const allData = await db.select().from(advocates);

  const filtered = search
    ? allData.filter((advocate) => {
        return (
          advocate.firstName.toLowerCase().includes(search) ||
          advocate.lastName.toLowerCase().includes(search) ||
          advocate.city.toLowerCase().includes(search) ||
          advocate.degree.toLowerCase().includes(search) ||
          advocate.specialties.some((s) => s.toLowerCase().includes(search)) ||
          advocate.yearsOfExperience.toString().includes(search)
        );
      })
    : allData;

  const offset = (page - 1) * limit;
  const data = filtered.slice(offset, offset + limit);
  const total = filtered.length;

  return Response.json({
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}
