import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Activity,
  Search,
  FileText,
  UserCheck,
  Shield,
  BarChart3,
} from "lucide-react";

export function UserDashboard() {
  // Dummy data for cases
  const cases = [
    {
      id: 1,
      caseNumber: "CR-12345",
      status: "Open",
      assignedTo: "Officer John",
      lastUpdated: "2023-10-15",
    },
    {
      id: 2,
      caseNumber: "CR-67890",
      status: "Closed",
      assignedTo: "Investigator Jane",
      lastUpdated: "2023-10-10",
    },
    {
      id: 3,
      caseNumber: "CR-54321",
      status: "In Progress",
      assignedTo: "Officer Mike",
      lastUpdated: "2023-10-12",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Shield className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Crime Record Management System
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <Activity className="w-4 h-4 mr-2" />
            Activity Log
          </Button>
          <Button>
            <UserCheck className="w-4 h-4 mr-2" />
            Profile
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="cases" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="cases">
            <FileText className="w-4 h-4 mr-2" />
            Cases
          </TabsTrigger>
          <TabsTrigger value="search">
            <Search className="w-4 h-4 mr-2" />
            Search
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Cases Tab */}
        <TabsContent value="cases">
          <Card>
            <CardHeader>
              <CardTitle>Case Management</CardTitle>
              <CardDescription>
                View and manage all assigned cases.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Case Number</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cases.map((caseItem) => (
                    <TableRow key={caseItem.id}>
                      <TableCell>{caseItem.caseNumber}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            caseItem.status === "Open"
                              ? "default"
                              : caseItem.status === "Closed"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {caseItem.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{caseItem.assignedTo}</TableCell>
                      <TableCell>{caseItem.lastUpdated}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Search Tab */}
        <TabsContent value="search">
          <Card>
            <CardHeader>
              <CardTitle>Search Cases</CardTitle>
              <CardDescription>
                Quickly find cases using advanced search.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <Input placeholder="Search by case number, status, or assigned officer" />
                <Button>
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Crime Analytics</CardTitle>
              <CardDescription>
                Generate insights with crime statistics and trends.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Cases</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">1,234</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Open Cases</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">567</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
