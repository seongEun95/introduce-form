"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";
import { useChurchStore } from "@/store/userStore";
import { churchIntroSchema, type ChurchIntroFormData, baptismOptions } from "@/lib/schemas";
import { submitToGoogleSheets, testGoogleSheetsConnection } from "@/lib/googleSheets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Users, BookOpen } from "lucide-react";

export default function ChurchIntroducePage() {
  const { churchProfile, setChurchProfile, isLoading, setLoading } = useChurchStore();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  const form = useForm<ChurchIntroFormData>({
    resolver: zodResolver(churchIntroSchema),
    defaultValues: {
      name: churchProfile?.name || "",
      birthDate: churchProfile?.birthDate || "",
      occupation: churchProfile?.occupation || "",
      location: churchProfile?.location || "",
      baptized: churchProfile?.baptized || undefined,
      churchHistory: churchProfile?.churchHistory || "",
      discipleshipThoughts: churchProfile?.discipleshipThoughts || "",
      ministryTeam: churchProfile?.ministryTeam || "",
      currentInterests: churchProfile?.currentInterests || "",
      favoritePraise: churchProfile?.favoritePraise || "",
      favoriteFood: churchProfile?.favoriteFood || "",
      dislikedFood: churchProfile?.dislikedFood || "",
      prayerRequest: churchProfile?.prayerRequest || "",
    },
  });

  const onSubmit = async (data: ChurchIntroFormData) => {
    setLoading(true);

    try {
      // Google Sheets에 데이터 저장
      const result = await submitToGoogleSheets(data);

      if (result.success) {
        // 성공시 로컬 스토어에도 저장 (기존 기능 유지)
        setChurchProfile(data);
        setIsSubmitted(true);

        // 성공 메시지 표시
        alert(`✅ ${result.message}`);
      } else {
        // 실패시 에러 메시지 표시
        alert(`❌ ${result.message}`);
        console.error("Google Sheets 저장 실패:", result.message);
      }
    } catch (error) {
      // 예외 발생시 처리
      console.error("폼 제출 중 오류 발생:", error);
      alert("❌ 예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  // Google Apps Script 연결 테스트 함수
  const handleTestConnection = async () => {
    setIsTestingConnection(true);

    try {
      const result = await testGoogleSheetsConnection();

      if (result.success) {
        alert(`✅ ${result.message}`);
      } else {
        alert(`❌ ${result.message}`);
      }
    } catch (error) {
      console.error("연결 테스트 오류:", error);
      alert("❌ 연결 테스트 중 오류가 발생했습니다.");
    } finally {
      setIsTestingConnection(false);
    }
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

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              자기소개 작성
            </h1>
            <p className="text-md text-gray-600 max-w-3xl mx-auto">
              공동체 식구들과 서로를 알아가는 소중한 시간입니다.
              <br />
              편안하게 자신을 소개해주세요! 💙
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                자기 소개
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* 기본 정보 섹션 */}
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      기본 정보
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* 이름 */}
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">이름 *</FormLabel>
                            <FormControl>
                              <Input placeholder="홍길동" {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* 생년월일 */}
                      <FormField
                        control={form.control}
                        name="birthDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">생년월일 *</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* 하는 일/전공 */}
                      <FormField
                        control={form.control}
                        name="occupation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">하는 일/전공 *</FormLabel>
                            <FormControl>
                              <Input placeholder="하는 일" {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* 사는 곳 */}
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">사는 곳 (간단히) *</FormLabel>
                            <FormControl>
                              <Input placeholder="서울시 강남구" {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* 신앙 정보 섹션 */}
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      신앙 정보
                    </h3>
                    <div className="space-y-6">
                      {/* 세례 여부 */}
                      <FormField
                        control={form.control}
                        name="baptized"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">세례 여부 *</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex gap-6 mt-2"
                              >
                                {baptismOptions.map((option) => (
                                  <div key={option.value} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option.value} id={option.value} />
                                    <Label htmlFor={option.value} className="cursor-pointer">
                                      {option.label}
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* 사랑의 교회 출석 기간 */}
                      <FormField
                        control={form.control}
                        name="churchHistory"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              사랑의 교회는 언제부터 나오셨나요? *
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="2023년부터, 6개월 전부터 등" {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* 제자훈련 생각 */}
                      <FormField
                        control={form.control}
                        name="discipleshipThoughts"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">제자훈련 생각은? *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="제자훈련에 대한 생각이나 경험을 자유롭게 나누어주세요..."
                                className="min-h-[100px] bg-white resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="text-gray-500">
                              제자훈련에 대한 관심, 경험, 기대 등을 편안하게 적어주세요.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* 섬기는 사역팀 */}
                      <FormField
                        control={form.control}
                        name="ministryTeam"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">섬기는 사역팀</FormLabel>
                            <FormControl>
                              <Input placeholder="찬양팀, 한사랑국 (없다면 공란)" {...field} className="bg-white" />
                            </FormControl>
                            <FormDescription className="text-gray-500">
                              현재 섬기고 계신 사역팀이 있다면 적어주세요.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* 개인 정보 섹션 */}
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-green-800 mb-4">개인적인 이야기</h3>
                    <div className="space-y-6">
                      {/* 요즘 관심사 */}
                      <FormField
                        control={form.control}
                        name="currentInterests"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">요즘 관심사 *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="요즘 관심있는 것들을 자유롭게 나누어주세요"
                                className="min-h-[80px] bg-white resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* 좋아하는 찬양 */}
                      <FormField
                        control={form.control}
                        name="favoritePraise"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">좋아하는 찬양 *</FormLabel>
                            <FormControl>
                              <Input placeholder="찬양 제목이나 가수명을 적어주세요" {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* 좋아하는 음식 */}
                        <FormField
                          control={form.control}
                          name="favoriteFood"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-medium">좋아하는 음식 *</FormLabel>
                              <FormControl>
                                <Input placeholder="피자, 치킨, 떡볶이 등" {...field} className="bg-white" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* 싫어하는 음식 */}
                        <FormField
                          control={form.control}
                          name="dislikedFood"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-medium">
                                싫어하는 음식 또는 못 먹는 음식
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="알레르기나 기피 음식 (없다면 비워두세요)"
                                  {...field}
                                  className="bg-white"
                                />
                              </FormControl>
                              <FormDescription className="text-gray-500">
                                공동체 식사 때 참고할 수 있도록 알려주세요.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 기도제목 섹션 */}
                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-yellow-800 mb-4">기도 나눔</h3>
                    <FormField
                      control={form.control}
                      name="prayerRequest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">나의 기도제목 *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="공동체 식구들과 함께 기도하고 싶은 제목을 나누어주세요"
                              className="min-h-[120px] bg-white resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-gray-500">
                            개인적인 기도제목이나 가족, 직장, 학업 등 무엇이든 편안하게 나누어주세요
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* 제출 버튼 */}
                  <div className="text-center pt-6 space-y-4">
                    {/* Google Sheets 연결 테스트 버튼 */}
                    <div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={isTestingConnection || isLoading}
                        onClick={handleTestConnection}
                        className="mb-4 text-gray-600 border-gray-300 hover:bg-gray-50"
                      >
                        {isTestingConnection ? "연결 테스트 중..." : "🔗 Google Sheets 연결 테스트"}
                      </Button>
                    </div>

                    {/* 메인 제출 버튼 */}
                    <div>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isLoading}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                      >
                        {isLoading ? "저장 중..." : "자기소개 저장하기 💝"}
                      </Button>
                    </div>

                    {/* 안내 메시지 */}
                    <p className="text-sm text-gray-500 mt-4">💡 제출하기 전에 연결 테스트를 해보세요!</p>
                  </div>
                </form>
              </Form>

              {/* 저장된 프로필 표시 */}
              {churchProfile && isSubmitted && (
                <div className="mt-12 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                  <h3 className="font-bold text-xl text-green-800 mb-6 text-center">🎉 저장된 자기소개</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <p>
                        <strong className="text-gray-700">이름:</strong> {churchProfile.name}
                      </p>
                      <p>
                        <strong className="text-gray-700">생년월일:</strong> {churchProfile.birthDate}
                      </p>
                      <p>
                        <strong className="text-gray-700">하는 일:</strong> {churchProfile.occupation}
                      </p>
                      <p>
                        <strong className="text-gray-700">사는 곳:</strong> {churchProfile.location}
                      </p>
                      <p>
                        <strong className="text-gray-700">세례 여부:</strong>{" "}
                        {churchProfile.baptized === "yes" ? "예" : "아니요"}
                      </p>
                      <p>
                        <strong className="text-gray-700">교회 출석:</strong> {churchProfile.churchHistory}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p>
                        <strong className="text-gray-700">좋아하는 찬양:</strong> {churchProfile.favoritePraise}
                      </p>
                      <p>
                        <strong className="text-gray-700">좋아하는 음식:</strong> {churchProfile.favoriteFood}
                      </p>
                      {churchProfile.dislikedFood && (
                        <p>
                          <strong className="text-gray-700">못 먹는 음식:</strong> {churchProfile.dislikedFood}
                        </p>
                      )}
                      {churchProfile.ministryTeam && (
                        <p>
                          <strong className="text-gray-700">섬기는 사역팀:</strong> {churchProfile.ministryTeam}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div>
                      <strong className="text-gray-700">요즘 관심사:</strong>
                      <p className="text-gray-600 mt-1">{churchProfile.currentInterests}</p>
                    </div>
                    <div>
                      <strong className="text-gray-700">제자훈련 생각:</strong>
                      <p className="text-gray-600 mt-1">{churchProfile.discipleshipThoughts}</p>
                    </div>
                    <div>
                      <strong className="text-gray-700">기도제목:</strong>
                      <p className="text-gray-600 mt-1">{churchProfile.prayerRequest}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
