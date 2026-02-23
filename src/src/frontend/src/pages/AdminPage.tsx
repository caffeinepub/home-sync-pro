import { useState, useMemo } from "react";
import { useGetAllSubmissions } from "../hooks/useQueries";
import { ContactSubmission, ServiceType } from "../backend";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, X, Mail, Phone } from "lucide-react";

const SERVICE_TYPE_LABELS: Record<ServiceType, string> = {
  [ServiceType.lighting]: "Lighting",
  [ServiceType.security]: "Security",
  [ServiceType.climateControl]: "Climate Control",
  [ServiceType.entertainment]: "Entertainment",
  [ServiceType.networking]: "Networking",
  [ServiceType.energyManagement]: "Energy Management",
};

const SERVICE_TYPE_COLORS: Record<ServiceType, string> = {
  [ServiceType.lighting]: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100",
  [ServiceType.security]: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  [ServiceType.climateControl]: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  [ServiceType.entertainment]: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  [ServiceType.networking]: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  [ServiceType.energyManagement]: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100",
};

function formatTimestamp(timestamp: bigint): string {
  const date = new Date(Number(timestamp) / 1_000_000);
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function AdminPage() {
  const { data: submissions, isLoading, error } = useGetAllSubmissions();
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceFilter, setServiceFilter] = useState<string>("all");

  const filteredSubmissions = useMemo(() => {
    if (!submissions) return [];

    let filtered = [...submissions];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (sub) =>
          sub.name.toLowerCase().includes(query) ||
          sub.email.toLowerCase().includes(query)
      );
    }

    // Apply service type filter
    if (serviceFilter !== "all") {
      filtered = filtered.filter((sub) => sub.serviceInterest === serviceFilter);
    }

    // Sort by timestamp descending (newest first)
    filtered.sort((a, b) => Number(b.timestamp - a.timestamp));

    return filtered;
  }, [submissions, searchQuery, serviceFilter]);

  const clearFilters = () => {
    setSearchQuery("");
    setServiceFilter("all");
  };

  const hasActiveFilters = searchQuery.trim() !== "" || serviceFilter !== "all";

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Loading submissions...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Error Loading Submissions</CardTitle>
            <CardDescription>
              {error instanceof Error ? error.message : "An unknown error occurred"}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-sans font-bold text-foreground mb-2">
          Consultation Submissions
        </h1>
        <p className="text-muted-foreground font-body">
          View and manage all customer consultation inquiries
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Service Filter */}
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="w-full md:w-[220px]">
                <SelectValue placeholder="Filter by service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                {Object.entries(SERVICE_TYPE_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full md:w-auto"
              >
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredSubmissions.length} of {submissions?.length || 0} submissions
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <Card>
          <CardContent className="p-0">
            {filteredSubmissions.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-muted-foreground font-body">
                  {hasActiveFilters
                    ? "No submissions match your filters"
                    : "No submissions yet"}
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Service Interest</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.map((submission, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {formatTimestamp(submission.timestamp)}
                      </TableCell>
                      <TableCell className="font-medium">
                        {submission.name}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <a
                            href={`mailto:${submission.email}`}
                            className="flex items-center gap-1.5 text-sm text-primary hover:underline"
                          >
                            <Mail className="h-3.5 w-3.5" />
                            {submission.email}
                          </a>
                          <a
                            href={`tel:${submission.phone}`}
                            className="flex items-center gap-1.5 text-sm text-primary hover:underline"
                          >
                            <Phone className="h-3.5 w-3.5" />
                            {submission.phone}
                          </a>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={SERVICE_TYPE_COLORS[submission.serviceInterest]}
                        >
                          {SERVICE_TYPE_LABELS[submission.serviceInterest]}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-md">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {submission.message}
                        </p>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filteredSubmissions.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground font-body">
                {hasActiveFilters
                  ? "No submissions match your filters"
                  : "No submissions yet"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredSubmissions.map((submission, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{submission.name}</CardTitle>
                    <CardDescription className="text-xs">
                      {formatTimestamp(submission.timestamp)}
                    </CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className={SERVICE_TYPE_COLORS[submission.serviceInterest]}
                  >
                    {SERVICE_TYPE_LABELS[submission.serviceInterest]}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <a
                    href={`mailto:${submission.email}`}
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <Mail className="h-4 w-4" />
                    {submission.email}
                  </a>
                  <a
                    href={`tel:${submission.phone}`}
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <Phone className="h-4 w-4" />
                    {submission.phone}
                  </a>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    {submission.message}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
