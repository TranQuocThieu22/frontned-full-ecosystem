"use client"

import ChatBotAdmissionButton from "@/module/ChatAdmission/ChatBotAdmissionButton"
import ChatBotAQNewSolutionButton from "@/module/ChatAQNewSolution/ChatBotAQNewSolutionButton"
import { useStore_Global } from "@/stores/useStore_Global"
import { Badge, Button, Card, Group, TextInput } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import {
  BookCheck,
  Boxes,
  Calculator,
  CheckCircle,
  Clock,
  ExternalLink,
  FileBadge,
  FileText,
  FlaskConical,
  Grid3X3,
  Handshake,
  LayoutGrid,
  List,
  ListChecks,
  Mic,
  PieChart,
  Search,
  Star,
  Users
} from "lucide-react"
import { useRouter } from "next/navigation"
import type React from "react"
import { useEffect, useState } from "react"

interface SoftwareApp {
  id: number
  name: string
  description: string
  icon: React.ReactNode
  category: string
  color: string
  url: string
  lastUsed?: string
  rating?: number
  status?: "production" | "maintenance" | "new" | "development" | "comingSoon"
}

const softwareApps: SoftwareApp[] = [
  {
    id: 1,
    name: "Short-Term Training Management (STM)",
    description: "Phần mềm Quản lý Đào tạo các lớp ngắn hạn",
    icon: <Users className="w-6 h-6" />,
    category: "Đào tạo",
    color: "bg-blue-500",
    url: "http://192.168.1.16/stm-staging",
    lastUsed: "2 giờ trước",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Student Activity Evaluation (SAE)",
    description: "Phần mềm trực tuyến quản lý hoạt động ngoại khóa và điểm rèn luyện",
    icon: <Calculator className="w-6 h-6" />,
    category: "Sinh viên",
    color: "bg-green-500",
    url: "https://vp.aqtech.edu.vn/sae/auth/login/",
    lastUsed: "1 ngày trước",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Learning Outcome Management (LOM)",
    description: "Phần mềm Quản lý đo lường và đánh giá chuẩn đầu ra chương trình đào tạo",
    icon: <ListChecks className="w-6 h-6" />,
    category: "Đào tạo",
    color: "bg-blue-600",
    url: "http://192.168.1.16/lom-staging/auth/login/",
    lastUsed: "2 ngày trước",
    rating: 4.6,
    status: "development",
  },
  {
    id: 4,
    name: "Quality Measurement & Evaluation (QME)",
    description: "Phần mềm Tổng hợp và báo cáo số liệu theo chuẩn chất lượng cơ sở giáo dục",
    icon: <CheckCircle className="w-6 h-6" />,
    category: "Đảm bảo chất lượng",
    color: "bg-green-600",
    url: "https://aq-edu-qmes.vercel.app/",
    lastUsed: "3 ngày trước",
    rating: 4.7,
    status: "development",
  },
  {
    id: 5,
    name: "Science Research Management (SRM)",
    description: "Phần mềm Quản lý nghiên cứu khoa học",
    icon: <FlaskConical className="w-6 h-6" />,
    category: "Nghiên cứu",
    color: "bg-fuchsia-600",
    url: "https://vp.aqtech.edu.vn/srm/",
    lastUsed: "4 giờ trước",
    rating: 4.5,
    status: "development",
  },
  {
    id: 6,
    name: "Asset Management System (AMS)",
    description: "Phần mềm Quản lý Tài sản - Thiết bị - Vật tư",
    icon: <Boxes className="w-6 h-6" />,
    category: "Tài sản",
    color: "bg-yellow-600",
    url: "https://aq-edu-asm.vercel.app/",
    lastUsed: "1 ngày trước",
    rating: 4.6,
    status: "development",
  },
  {
    id: 7,
    name: "Evidence for Accreditation and Quality (EAQ)",
    description: "Phần mềm Quản lý Báo cáo tự đánh giá Minh chứng Kiểm định và cải tiến chất lượng",
    icon: <FileBadge className="w-6 h-6" />,
    category: "Đảm bảo chất lượng",
    color: "bg-orange-600",
    url: "https://vp.aqtech.edu.vn/eaq/auth/login/",
    lastUsed: "2 giờ trước",
    rating: 4.8,
    status: "development",
  },
  {
    id: 8,
    name: "Survey Versatility & Navigation (SVN)",
    description: "Phần mềm khảo sát ý kiến các bên liên quan",
    icon: <PieChart className="w-6 h-6" />,
    category: "Khảo sát",
    color: "bg-teal-600",
    url: "https://aq-edu-svn-prototype.vercel.app/",
    lastUsed: "12 giờ trước",
    rating: 4.4,
    status: "development",
  },
  {
    id: 9,
    name: "Exam and Versatile Assessment (EVA)",
    description: "Hệ thống Quản lý Ngân hàng Đề và Khảo thí Trực tuyến",
    icon: <BookCheck className="w-6 h-6" />,
    category: "Khảo thí",
    color: "bg-rose-600",
    url: "https://aq-edu-eva-prototype.vercel.app/",
    lastUsed: "5 giờ trước",
    rating: 4.7,
    status: "development",
  },
  {
    id: 10,
    name: "Intellectual Property Management (IPM)",
    description: "Phần mềm Quản lý Sở hữu trí tuệ",
    icon: <BookCheck className="w-6 h-6" />,
    category: "Nghiên cứu",
    color: "bg-purple-600",
    url: "https://aq-edu-ipm.vercel.app",
    lastUsed: "6 giờ trước",
    rating: 4.6,
    status: "comingSoon",
  },
  {
    id: 11,
    name: "Authoring Process Management (APM)",
    description: "Phần mềm Quản lý Quy trình Biên soạn",
    icon: <FileText className="w-6 h-6" />,
    category: "Nghiên cứu",
    color: "bg-indigo-600",
    url: "https://aq-edu-apm.vercel.app/admin/dashboard",
    lastUsed: "1 ngày trước",
    rating: 4.5,
    status: "comingSoon",
  },
  {
    id: 12,
    name: "International Cooperation Management (ICM)",
    description: "Phần mềm Quản lý Hợp tác Quốc tế",
    icon: <Handshake className="w-6 h-6" />,
    category: "Nghiên cứu",
    color: "bg-sky-600",
    url: "https://aq-edu-icm.vercel.app",
    lastUsed: "2 ngày trước",
    rating: 4.7,
    status: "comingSoon",
  },
  {
    id: 13,
    name: "Scientific Conference Management (SCM)",
    description: "Phần mềm Quản lý Hội thảo Khoa học",
    icon: <Mic className="w-6 h-6" />,
    category: "Nghiên cứu",
    color: "bg-pink-600",
    url: "https://aq-edu-scm.vercel.app/",
    lastUsed: "3 ngày trước",
    rating: 4.4,
    status: "comingSoon",
  },
];


type ViewMode = "grid" | "list" | "cards" | "table"

export default function SoftwareDashboard() {
  const store = useStore_Global()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tất cả")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")

  const categories = ["Tất cả", ...Array.from(new Set(softwareApps.map((app) => app.category)))]

  const filteredApps = softwareApps.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Tất cả" || app.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAppClick = (app: SoftwareApp) => {
    console.log(`Opening ${app.name} at ${app.url}`)
    window.open(app.url)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "production":
        return "bg-green-100 text-green-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      case "new":
        return "bg-pink-100 text-pink-800"
      case "development":
        return "bg-violet-100 text-blue-800"
      case "comingSoon":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "production":
        return "Hoạt động"
      case "maintenance":
        return "Bảo trì"
      case "new":
        return "Mới"
      case "development":
        return "Đang phát triển"
      case "comingSoon":
        return "Sắp ra mắt"
      default:
        return "Không xác định"
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }


  useEffect(() => {
    if (store.state.isLogin === false) {
      router.replace("/auth/login")
    } else {
      router.replace("/")
    }
  }, [store.state.isLogin])
  if (store.state.isLogin == false) return "Đang tải trang..."
  return (<>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600 rounded-xl">
                <Grid3X3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">AQ EduSMART</h1>
                <p className="text-gray-600 mt-1">
                  Hệ thống thông tin quản lý giáo dục được phát triển bởi AQTECH.EDU.VN
                </p>
              </div>
            </div>

            <Group align="center">
              <TextInput
                leftSection={<IconSearch />}
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />

              {/* View Mode Selector */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "transparent"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-8 px-3"
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "transparent"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-8 px-3"
                >
                  <List className="w-4 h-4" />
                </Button>
                {/* <Button
                  variant={viewMode === "cards" ? "default" : "transparent"}
                  size="sm"
                  onClick={() => setViewMode("cards")}
                  className="h-8 px-3"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "table" ? "default" : "transparent"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                  className="h-8 px-3"
                >
                  <Table className="w-4 h-4" />
                </Button> */}
              </div>
            </Group>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`h-10 px-4 rounded-lg font-medium ${selectedCategory === category
                  ? "bg-blue-600 hover:bg-blue-700 text-white hover:text-white"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredApps.map((app) => (
              <Card
                key={app.id}
                className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 bg-white border-gray-200"
                onClick={() => handleAppClick(app)}
              >
                <Card.Section className="p-6">
                  <div className="text-center space-y-4">
                    <div
                      className={`${app.color} w-16 h-16 rounded-xl flex items-center justify-center mx-auto text-white group-hover:scale-110 transition-transform duration-200`}
                    >
                      {app.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                        {app.name}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{app.description}</p>
                    </div>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
                      {app.category}
                    </Badge>
                  </div>
                </Card.Section>
              </Card>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <div className="space-y-4">
            {filteredApps.map((app) => (
              <Card
                key={app.id}
                className="cursor-pointer transition-all duration-200 hover:shadow-md bg-white border-gray-200"
                onClick={() => handleAppClick(app)}
              >
                <Card.Section className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`${app.color} w-12 h-12 rounded-lg flex items-center justify-center text-white`}>
                      {app.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg text-gray-900">{app.name}</h3>
                        {app.status && <Badge className={`text-xs ${getStatusColor(app.status)}`}>{getStatusText(app.status)}</Badge>}
                      </div>
                      <p className="text-gray-600 text-sm">{app.description}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-2">
                        {app.category}
                      </Badge>
                      <p className="text-xs text-gray-500">{app.lastUsed}</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400" />
                  </div>
                </Card.Section>
              </Card>
            ))}
          </div>
        )}

        {/* Cards View */}
        {viewMode === "cards" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredApps.map((app) => (
              <Card
                key={app.id}
                className="cursor-pointer transition-all duration-200 hover:shadow-lg bg-white border-gray-200"
                onClick={() => handleAppClick(app)}
              >
                <Card.Section className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`${app.color} w-14 h-14 rounded-xl flex items-center justify-center text-white`}>
                      {app.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg text-gray-900">{app.name}</h3>
                        {app.status && <Badge className={`text-xs ${getStatusColor(app.status)}`}>{getStatusText(app.status)}</Badge>}
                      </div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{app.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {renderStars(app.rating || 0)}
                          <span className="text-sm text-gray-600 ml-1">{app.rating}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {app.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {app.lastUsed}
                      </div>
                    </div>
                  </div>
                </Card.Section>
              </Card>
            ))}
          </div>
        )}

        {/* Table View */}
        {viewMode === "table" && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ứng dụng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Danh mục
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Đánh giá
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sử dụng lần cuối
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredApps.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleAppClick(app)}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div
                            className={`${app.color} w-10 h-10 rounded-lg flex items-center justify-center text-white mr-4`}
                          >
                            {app.icon}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{app.name}</div>
                            <div className="text-sm text-gray-500 max-w-xs truncate">{app.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="outline" className="text-xs">
                          {app.category}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {app.status && <Badge className={`text-xs ${getStatusColor(app.status)}`}>{getStatusText(app.status)}</Badge>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          {renderStars(app.rating || 0)}
                          <span className="text-sm text-gray-600 ml-1">{app.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.lastUsed}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button size="sm" variant="outline">
                          Mở
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredApps.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 max-w-md mx-auto">
              <Search className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Không tìm thấy</h3>
              <p className="text-gray-600">Thử thay đổi từ khóa tìm kiếm</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="text-center text-gray-600">
            <p>© 2024 Hệ thống Quản lý Phần mềm - Công ty công nghệ Anh Quân</p>
          </div>
        </div>
      </footer>
    </div>
    <ChatBotAQNewSolutionButton />
    <ChatBotAdmissionButton />
  </>)
}
