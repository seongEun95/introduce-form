import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, MapPin, BookOpen, Users, Coffee, Gift, Calendar, Heart } from "lucide-react";
import Footer from "@/components/ui/Footer";

export default function CommunityInfoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/2025/second-half" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            2025년 하반기 메뉴로 돌아가기
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              공동체 정보
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">2025년 하반기 사랑의 교회 공동체 활동 안내</p>
          </div>
        </div>

        {/* Info Cards Grid */}
        <div className="max-w-6xl mx-auto space-y-8">
          {/* 예배 시간과 장소 */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Clock className="w-6 h-6" />
                예배 시간과 장소
              </CardTitle>
              <CardDescription className="text-blue-100">함께 하나님께 예배드리는 시간</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-gray-800">주일 대예배</h4>
                      <p className="text-gray-600">매주 주일 오전 14:10</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-gray-800">청년 예배(집회)</h4>
                      <p className="text-gray-600">매주 일요일 16:30</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-gray-800">예배 장소</h4>
                      <p className="text-gray-600">사랑의 교회 본당 지하 4층</p>
                      <p className="text-sm text-gray-500">서울시 서초구 반포대로 121</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 셀 모임 정보 */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Users className="w-5 h-5" />셀 모임 안내
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">시작일</span>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      2025년 9월 7일 (주일)
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">종료일</span>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      2026년 2월 22일 (주일)
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">총 기간</span>
                    <Badge className="bg-purple-600 text-white">약 25주</Badge>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg mt-4">
                    <p className="text-xs text-purple-800">📅 매주 주일 17:50 - 20:00 (2시간 10분)</p>
                    <p className="text-xs text-purple-800">🏢 장소 : S701호</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardTitle className="text-xl flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  교재명
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">믿음의 그릇</h3>
                    <p className="text-gray-600">약 7주간 진행</p>
                  </div>

                  <p className="text-xs text-gray-500 text-center">교재는 첫 모임 때 받으셨을거에요?</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 출석 관리 */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
              <CardTitle className="text-xl flex items-center gap-2">
                <Calendar className="w-5 h-5" />셀 모임 출석 관리
              </CardTitle>
              <CardDescription className="text-indigo-100">서로를 돌보고 격려하는 공동체</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-indigo-50 p-4 rounded-lg text-center">
                  <div className="text-md font-bold text-indigo-600 mb-2">토요일 참석 투표 진행</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <div className="text-md font-bold text-yellow-600 mb-2">불참 시 코멘트 남겨주기</div>
                </div>
              </div>
              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-700 text-center">
                  <strong>장기 불참 시 원투원 진행 ㄷㄷ</strong>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 간식과 리더십 */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Coffee className="w-5 h-5" />셀 모임 간식
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <div className="space-y-2">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-sm text-orange-700">1) 매주 돌아가며 준비</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-sm text-orange-700">2) 토요일 참여투표 인원으로 주문</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-sm text-orange-700">3) 당일 출석인원이 비용 1/n</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-sm text-orange-700">4) 리더가 간식 담당에게 모든 비용을 입금</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-sm text-orange-700">5) 리더 계좌로 참여 인원이 입금</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-sm text-orange-700">* 미입금 시 자동 헌금</p>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <p className="text-xs text-yellow-800">간식을 못먹는 분은 미리 코멘트 남겨주시면 됩니다!</p>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <p className="text-xs text-yellow-800">티타임, 아웃팅 등 필요할 때 모임 후 1/n 정산</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  리더십 순서
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="bg-teal-50 p-4 rounded-lg">
                    <ul className="text-sm text-teal-700 space-y-1">
                      <li>• 김건 목사님</li>
                      <li>• 신영광 엘더님</li>
                      <li>• 김성은 리더</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 연락처 및 문의 */}
          <Card className="shadow-xl border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">모든 이슈 저에게</h3>
              <p className="text-blue-100 mb-6">언제든지 편안하게 연락주세요! 함께하는 공동체가 되어 기쁩니다 💙</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Badge variant="secondary" className="bg-white/20 text-white px-4 py-2 text-sm">
                  📞 성은: 010-5126-7373
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
