"use client";

import { useEffect, useState } from "react";
import { Advocate } from "@/db/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PAGE_SIZE } from "@/constants";

const DEBOUNCE_MS = 300;

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchAdvocates = async (page: number, search: string) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: PAGE_SIZE.toString(),
      });
      if (search) {
        params.set("search", search);
      }
      
      const response = await fetch(`/api/advocates?${params}`);
      if (!response.ok) {
        throw new Error("Failed to fetch advocates");
      }
      const jsonResponse = await response.json();
      setAdvocates(jsonResponse.data);
      setPagination(jsonResponse.pagination);
    } catch (err) {
      console.error("Error fetching advocates:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch when debounced search changes
  useEffect(() => {
    setCurrentPage(1);
    fetchAdvocates(1, debouncedSearch);
  }, [debouncedSearch]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    fetchAdvocates(page, debouncedSearch);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onReset = () => {
    setSearchTerm("");
  };

  if (error) {
    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-4">Solace Advocates</h1>
        <p className="text-red-500">Failed to load advocates. Please try again later.</p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Solace Advocates</h1>

      <div className="flex gap-4 mb-6 items-center">
        <Input
          placeholder="Search advocates..."
          value={searchTerm}
          onChange={onChange}
          className="max-w-sm"
        />
        <Button variant="outline" onClick={onReset}>
          Reset
        </Button>
        {pagination && (
          <span className="text-sm text-muted-foreground">
            {pagination.total} advocate{pagination.total !== 1 ? "s" : ""} found
          </span>
        )}
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Degree</TableHead>
                <TableHead>Specialties</TableHead>
                <TableHead>Years of Experience</TableHead>
                <TableHead>Phone Number</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {advocates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    No advocates found.
                  </TableCell>
                </TableRow>
              ) : (
                advocates.map((advocate) => (
                  <TableRow key={advocate.id}>
                    <TableCell>{advocate.firstName}</TableCell>
                    <TableCell>{advocate.lastName}</TableCell>
                    <TableCell>{advocate.city}</TableCell>
                    <TableCell>{advocate.degree}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {advocate.specialties.map((s) => (
                          <span
                            key={s}
                            className="inline-block bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full text-xs"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{advocate.yearsOfExperience}</TableCell>
                    <TableCell>{advocate.phoneNumber}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {!loading && pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * PAGE_SIZE + 1}-
            {Math.min(currentPage * PAGE_SIZE, pagination.total)} of {pagination.total}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="flex items-center px-3 text-sm">
              Page {currentPage} of {pagination.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === pagination.totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
