"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getChurchIntroDetail, ChurchIntroListItem } from "@/lib/googleSheets";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, MapPin, Briefcase, Heart, Music, Coffee, Utensils, RefreshCw, List } from "lucide-react";
import Footer from "@/components/ui/Footer";

export default function ChurchIntroDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [introduction, setIntroduction] = useState<ChurchIntroListItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIntroduction = useCallback(async () => {
    if (!id) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await getChurchIntroDetail(id);

      if (result.success && result.data) {
        setIntroduction(result.data);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("데이터를 가져오는 중 오류가 발생했습니다.");
      console.error("상세 정보 가져오기 오류:", err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchIntroduction();
  }, [id, fetchIntroduction]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "날짜 없음";
    try {
      return new Date(dateString).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  const formatBirthDate = (dateString: string) => {
    if (!dateString) return "생년월일 없음";
    try {
      return new Date(dateString).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">자기소개를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !introduction) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-6 py-8">
          <Link
            href="/2025/second-half/list"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            목록으로 돌아가기
          </Link>

          <div className="max-w-2xl mx-auto">
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">!</span>
                </div>
                <h2 className="text-xl font-bold text-red-800 mb-2">자기소개를 찾을 수 없습니다</h2>
                <p className="text-red-600 mb-6">{error || "요청하신 자기소개가 존재하지 않습니다."}</p>
                <div className="space-x-3">
                  <Button
                    onClick={fetchIntroduction}
                    variant="outline"
                    className="border-red-300 text-red-700 hover:bg-red-50"
                  >
                    다시 시도
                  </Button>
                  <Link href="/2025/second-half/list">
                    <Button className="bg-blue-600 hover:bg-blue-700">목록으로 돌아가기</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <Link href="/2025/second-half/list" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              목록으로 돌아가기
            </Link>

            <div className="flex gap-3">
              <Button
                onClick={fetchIntroduction}
                disabled={isLoading}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                새로고침
              </Button>

              <Link href="/2025/second-half/list">
                <Button size="sm" variant="outline">
                  <List className="w-4 h-4 mr-2" />
                  전체 목록
                </Button>
              </Link>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {introduction.name}님의 자기소개
            </h1>
            <div className="flex items-center justify-center gap-2 text-gray-500 mb-4">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(introduction.timestamp)}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* 기본 정보 */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardTitle className="text-xl flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                기본 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">이름</label>
                    <p className="text-lg font-semibold text-gray-800">{introduction.name}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">생년월일</label>
                    <p className="text-gray-700">{formatBirthDate(introduction.birthDate)}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">하는 일/전공</label>
                    <p className="text-gray-700">{introduction.occupation}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">사는 곳</label>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-700">{introduction.location}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">세례 여부</label>
                    <div className="mt-1">
                      <Badge
                        variant={introduction.baptized === "예" ? "default" : "secondary"}
                        className="text-sm px-3 py-1"
                      >
                        {introduction.baptized === "예" ? "세례 받음 ✓" : "미세례"}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">교회 출석 기간</label>
                    <p className="text-gray-700">{introduction.churchHistory}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 신앙 정보 */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
              <CardTitle className="text-xl flex items-center gap-2">
                <Heart className="w-5 h-5" />
                신앙과 사역
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-500 mb-2 block">제자훈련에 대한 생각</label>
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                  <p className="text-gray-700 leading-relaxed">{introduction.discipleshipThoughts}</p>
                </div>
              </div>

              {introduction.ministryTeam && introduction.ministryTeam !== "없음" && (
                <div>
                  <label className="text-sm font-medium text-gray-500 mb-2 block">섬기는 사역팀</label>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 px-3 py-1">
                    {introduction.ministryTeam}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 개인적인 이야기 */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
              <CardTitle className="text-xl flex items-center gap-2">
                <Music className="w-5 h-5" />
                개인적인 이야기
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-500 mb-2 block">요즘 관심사</label>
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                  <p className="text-gray-700 leading-relaxed">{introduction.currentInterests}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 mb-2 block">좋아하는 찬양</label>
                <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg">
                  <Music className="w-5 h-5 text-blue-600" />
                  <p className="text-gray-700 font-medium">{introduction.favoritePraise}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500 mb-2 block">좋아하는 음식</label>
                  <div className="flex items-center gap-3 bg-orange-50 p-4 rounded-lg">
                    <Coffee className="w-5 h-5 text-orange-600" />
                    <p className="text-gray-700">{introduction.favoriteFood}</p>
                  </div>
                </div>

                {introduction.dislikedFood && introduction.dislikedFood !== "없음" && (
                  <div>
                    <label className="text-sm font-medium text-gray-500 mb-2 block">싫어하는/못 먹는 음식</label>
                    <div className="flex items-center gap-3 bg-red-50 p-4 rounded-lg">
                      <Utensils className="w-5 h-5 text-red-600" />
                      <p className="text-gray-700">{introduction.dislikedFood}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 기도제목 */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <CardTitle className="text-xl flex items-center gap-2">
                <Heart className="w-5 h-5" />
                기도 나눔
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <label className="text-sm font-medium text-gray-500 mb-2 block">나의 기도제목</label>
              <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400">
                <p className="text-gray-700 leading-relaxed text-lg">{introduction.prayerRequest}</p>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500 italic">
                  &ldquo;이와 같이 성령도 우리의 연약함을 도우시나니&rdquo; - 로마서 8:26
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 액션 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/2025/second-half/list">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700"
              >
                <List className="w-4 h-4 mr-2" />
                다른 자기소개 보기
              </Button>
            </Link>

            <Link href="/2025/second-half/introduce">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                새 자기소개 작성하기
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
