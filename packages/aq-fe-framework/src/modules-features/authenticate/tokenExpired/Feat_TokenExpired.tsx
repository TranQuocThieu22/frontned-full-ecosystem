"use client"

import { Button, Card, CardSection, Center, Text, Title } from "@mantine/core"
import { Clock, LogIn, Shield } from "lucide-react"


interface Feat_TokenExpiredProps {
    loginRedirect?: string
}

export function Feat_TokenExpired({
    loginRedirect = "/auth/login"
}: Feat_TokenExpiredProps) {
    const handleLogin = () => {
        // Redirect to login page or handle login logic
        window.location.href = loginRedirect
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-8">
            <div className="w-full max-w-md">
                {/* Floating background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
                </div>

                <Card className="relative backdrop-blur-sm bg-white/80 border-0 shadow-2xl shadow-blue-500/10 py-12 px-8 rounded-xl">
                    <CardSection className="text-center space-y-6 pb-8">
                        {/* Animated icon container */}
                        <div className="relative">
                            <Center>
                                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/25 animate-pulse">
                                    <Clock className="w-10 h-10 text-white" />
                                </div>
                            </Center>

                        </div>

                        <div className="space-y-3">
                            <Title className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                Phiên đăng nhập đã hết hạn
                            </Title>
                            <Text className="text-gray-600 text-base leading-relaxed px-2">
                                Phiên làm việc của bạn đã hết hạn vì lý do bảo mật.
                                <br />
                                Vui lòng đăng nhập lại để tiếp tục sử dụng dịch vụ.
                            </Text>
                        </div>
                    </CardSection>

                    <CardSection className="space-y-6 pt-0">
                        <Button
                            onClick={handleLogin}
                            className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02]"
                            size="lg"
                        >
                            <LogIn className="w-5 h-5 mr-2" />
                            Đăng nhập lại
                        </Button>

                        {/* Additional info section */}
                        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-100">
                            <div className="text-center space-y-2">
                                <p className="text-sm font-medium text-gray-700">Cần hỗ trợ?</p>
                                <p className="text-sm text-gray-600">
                                    Liên hệ{" "}
                                    <a
                                        href="/support"
                                        className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 hover:underline"
                                    >
                                        đội ngũ hỗ trợ
                                    </a>{" "}
                                    của chúng tôi
                                </p>
                            </div>
                        </div>

                        {/* Security note */}
                        <div className="text-center">
                            <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                                <Shield className="w-3 h-3" />
                                Bảo mật tài khoản được ưu tiên hàng đầu
                            </p>
                        </div>
                    </CardSection>
                </Card>
            </div>
        </div>
    )
}
