import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Assuming you have Card components
import { Input } from "@/components/ui/input"; // Assuming you have an Input component
import { Clock, FileText, Search } from "lucide-react"; // Assuming you're using Lucide icons

export default function TestsPage() {
  // Mock test data
  const tests = [
    {
      id: 1,
      title: "UPSC Civil Services",
      description: "Preliminary examination mock test with 100 questions",
      price: "₹499",
      sets: 3,
      questions: 100,
      time: 120,
      category: "UPSC",
    },
    {
      id: 2,
      title: "SSC CGL",
      description: "Combined Graduate Level examination practice test",
      price: "₹299",
      sets: 2,
      questions: 100,
      time: 60,
      category: "SSC",
    },
    {
      id: 3,
      title: "Bank PO",
      description: "Probationary Officer examination with all sections",
      price: "₹349",
      sets: 3,
      questions: 100,
      time: 60,
      category: "Banking",
    },
    {
      id: 4,
      title: "Railway NTPC",
      description: "Non-Technical Popular Categories examination",
      price: "₹249",
      sets: 2,
      questions: 100,
      time: 90,
      category: "Railways",
    },
    {
      id: 5,
      title: "IBPS Clerk",
      description: "Institute of Banking Personnel Selection Clerk exam",
      price: "₹299",
      sets: 2,
      questions: 100,
      time: 60,
      category: "Banking",
    },
    {
      id: 6,
      title: "State PSC",
      description: "State Public Service Commission preliminary test",
      price: "₹399",
      sets: 3,
      questions: 100,
      time: 120,
      category: "State",
    },
    {
      id: 7,
      title: "UPSC CAPF",
      description: "Central Armed Police Forces Assistant Commandant exam",
      price: "₹349",
      sets: 2,
      questions: 100,
      time: 120,
      category: "UPSC",
    },
    {
      id: 8,
      title: "RBI Grade B",
      description: "Reserve Bank of India Officer Grade B examination",
      price: "₹449",
      sets: 3,
      questions: 120,
      time: 180,
      category: "Banking",
    },
    {
      id: 9,
      title: "GATE CSE",
      description: "Graduate Aptitude Test in Engineering for Computer Science",
      price: "₹599",
      sets: 3,
      questions: 65,
      time: 180,
      category: "Engineering",
    },
  ];

  return (
    <div className="container py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">All Tests</h1>
          <p className="text-muted-foreground">
            Browse our collection of mock tests for various government exams
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tests..."
              className="pl-8"
            />
          </div>
          <Button variant="outline">Filter</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => (
            <Card key={test.id} className="overflow-hidden">
              <CardHeader className="pb-0">
                <div className="text-sm text-blue-600 font-medium mb-1">
                  {test.category}
                </div>
                <CardTitle>{test.title}</CardTitle>
                <CardDescription>{test.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-1" />
                    <span>{test.sets} Sets</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{test.time} min</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {test.price}
                </div>
              </CardContent>
              <CardFooter>
                <Link to={`/tests/${test.id}`} className="w-full">
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
