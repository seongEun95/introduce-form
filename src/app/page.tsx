import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10" />
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

        <div className="relative container mx-auto px-3 py-24">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main heading */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
                2025년 하반기
              </h1>
              <h2 className="text-2xl md:text-5xl font-bold text-gray-800 mb-4">공동체에 오신 것을</h2>
              <h2 className="text-2xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                환영합니다! ✨
              </h2>
            </div>

            {/* Welcome message */}
            <p className="text-md md:text-2xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
              하나님의 사랑 안에서 함께하는 <span className="font-semibold text-purple-600">아름다운 공동체</span>
              입니다.
              <br className="mobile-hidden" />
              서로 사랑하고 돌보며, <span className="font-semibold text-blue-600">그리스도의 제자</span>로 성장해가는
              <br className="mobile-hidden" />
              <span className="font-semibold text-indigo-600">소중한 여러분</span>과 함께하게 되어 기쁩니다.
            </p>

            {/* Bible verse */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 mb-12 shadow-xl border border-white/20">
              <blockquote className="text-md md:text-xl text-gray-700 italic mb-4">
                &ldquo;새 계명을 너희에게 주노니 서로 사랑하라 내가 너희를 사랑한 것 같이 너희도 서로 사랑하라 너희가
                서로 사랑하면 이로써 모든 사람이 너희가 내 제자인 줄 알리라&rdquo;
              </blockquote>
              <cite className="text-purple-600 font-semibold">- 요한복음 13:34-35 -</cite>
            </div>

            {/* CTA Button */}
            <div className="space-y-6">
              <Link href="/2025/second-half">
                <Button
                  size="lg"
                  className="w-full cursor-pointer text-md bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-6 font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-purple-500/25"
                >
                  2025년 하반기 공동체 참여하기 🚀
                </Button>
              </Link>
              <p className="text-gray-600 mt-4">자기소개와 공동체 정보를 확인해보세요</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <h3 className="text-xl font-bold text-center text-gray-800 mb-16">함께하는 공동체의 특별함</h3>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🙏</span>
                </div>
                <CardTitle className="text-purple-700">함께하는 예배</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-700">
                  하나님을 향한 진실한 마음으로 드리는 예배와 찬양의 시간
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📖</span>
                </div>
                <CardTitle className="text-blue-700">말씀과 교제</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-700">
                  하나님의 말씀을 통해 성장하고 서로의 삶을 나누는 교제
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200 hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">❤️</span>
                </div>
                <CardTitle className="text-indigo-700">사랑과 섬김</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-700">
                  그리스도의 사랑으로 서로 돌보고 섬기는 공동체
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
