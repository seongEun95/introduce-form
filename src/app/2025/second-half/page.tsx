import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users, Info, List } from "lucide-react";
import Footer from "@/components/ui/Footer";

export default function SecondHalfPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            메인 페이지로 돌아가기
          </Link>

          <div className="text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              2025년 하반기
            </h1>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">사랑의 교회 공동체</h2>
            <p className="text-md text-gray-600 max-w-2xl mx-auto">
              함께 성장하고 서로 사랑하는 공동체의 일원이 되어주세요
            </p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* 자기소개 카드 */}
          <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl text-blue-700">자기소개 작성</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6 leading-relaxed">
                이름, 생년월일, 하는 일, 세례 여부, 관심사 등을
                <br />
                공유하여 서로를 더 잘 알아가요
              </p>
              <Link href="/2025/second-half/introduce">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  자기소개 작성하기 ✍️
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* 자기소개 목록 카드 */}
          {/* <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <List className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl text-green-700">자기소개 목록</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6 leading-relaxed">
                공동체 식구들의 자기소개를
                <br />
                확인하고 서로를 더 알아가세요
              </p>
              <Link href="/2025/second-half/list">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  목록 보기 📋
                </Button>
              </Link>
            </CardContent>
          </Card> */}

          {/* 공동체 정보 카드 */}
          <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Info className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl text-purple-700">공동체 정보</CardTitle>
              <CardDescription className="text-gray-700 text-lg">
                예배 시간, 셀 모임, 교재 등 공동체 활동 안내
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6 leading-relaxed">
                예배 시간과 장소, 셀 모임 기간, 교재명,
                <br />
                출석 관리, 간식, 생일 축하 등의 정보를 확인하세요
              </p>
              <Link href="/2025/second-half/info">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  공동체 정보 보기 📋
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
