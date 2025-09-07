"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getChurchIntroList, ChurchIntroListItem, testDirectURL } from "@/lib/googleSheets";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Calendar, MapPin, Briefcase, RefreshCw, Eye } from "lucide-react";
import Footer from "@/components/ui/Footer";

export default function ChurchIntroListPage() {
  const [introductions, setIntroductions] = useState<ChurchIntroListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIntroductions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getChurchIntroList();

      if (result.success) {
        setIntroductions(result.data);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("데이터를 가져오는 중 오류가 발생했습니다.");
      console.error("목록 가져오기 오류:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIntroductions();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "날짜 없음";
    try {
      return new Date(dateString).toLocaleDateString("ko-KR");
    } catch {
      return dateString;
    }
  };

  const truncateText = (text: string, maxLength: number = 50) => {
    if (!text) return "내용 없음";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/2025/second-half" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            2025년 하반기 메뉴로 돌아가기
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                자기소개 목록
              </h1>
              <p className="text-gray-600">공동체 식구들의 자기소개를 확인해보세요</p>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={fetchIntroductions}
                disabled={isLoading}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                새로고침
              </Button>

              <Button
                onClick={testDirectURL}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 border-orange-300 text-orange-700 hover:bg-orange-50"
              >
                🔧 URL 테스트
              </Button>

              <Link href="/2025/second-half/introduce">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  새 자기소개 작성
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">데이터를 불러오는 중...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">!</span>
              </div>
              <div>
                <h3 className="font-semibold text-red-800">오류가 발생했습니다</h3>
                <p className="text-red-600">{error}</p>
              </div>
            </div>
            <Button
              onClick={fetchIntroductions}
              variant="outline"
              size="sm"
              className="mt-4 border-red-300 text-red-700 hover:bg-red-50"
            >
              다시 시도
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && introductions.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">아직 자기소개가 없습니다</h3>
            <p className="text-gray-500 mb-6">첫 번째 자기소개를 작성해보세요!</p>
            <Link href="/2025/second-half/introduce">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                자기소개 작성하기
              </Button>
            </Link>
          </div>
        )}

        {/* Introduction List */}
        {!isLoading && !error && introductions.length > 0 && (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                총 <span className="font-semibold text-blue-600">{introductions.length}</span>개의 자기소개
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {introductions.map((intro) => (
                <Card
                  key={intro.id}
                  className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/90 backdrop-blur-sm"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg font-bold text-gray-800 mb-1">
                          {intro.name || "이름 없음"}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <Calendar className="w-3 h-3" />
                          {formatDate(intro.timestamp)}
                        </div>
                      </div>
                      <Badge variant={intro.baptized === "예" ? "default" : "secondary"} className="text-xs">
                        {intro.baptized === "예" ? "세례 ✓" : "미세례"}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Briefcase className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600">{truncateText(intro.occupation, 20)}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600">{truncateText(intro.location, 20)}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-sm text-gray-600 mb-3">
                        <strong>관심사:</strong> {truncateText(intro.currentInterests, 40)}
                      </p>

                      <p className="text-sm text-gray-600 mb-4">
                        <strong>기도제목:</strong> {truncateText(intro.prayerRequest, 40)}
                      </p>
                    </div>

                    <Link href={`/2025/second-half/detail/${intro.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        자세히 보기
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Statistics */}
        {!isLoading && !error && introductions.length > 0 && (
          <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">📊 공동체 현황</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">{introductions.length}</div>
                <div className="text-sm text-blue-800">총 멤버</div>
              </div>

              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {introductions.filter((intro) => intro.baptized === "예").length}
                </div>
                <div className="text-sm text-green-800">세례 받은 분</div>
              </div>

              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {introductions.filter((intro) => intro.ministryTeam && intro.ministryTeam !== "없음").length}
                </div>
                <div className="text-sm text-purple-800">사역 참여</div>
              </div>

              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  {new Set(introductions.map((intro) => intro.location.split(" ")[0])).size}
                </div>
                <div className="text-sm text-orange-800">거주 지역</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
