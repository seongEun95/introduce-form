"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { userProfileSchema, type UserProfileFormData, interestOptions } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function IntroduceForm() {
  const { profile, setProfile, isLoading, setLoading } = useUserStore();
  const [selectedInterests, setSelectedInterests] = useState<string[]>(profile?.interests || []);

  const form = useForm<UserProfileFormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: profile?.name || "",
      email: profile?.email || "",
      age: profile?.age || 0,
      bio: profile?.bio || "",
      interests: profile?.interests || [],
    },
  });

  const onSubmit = async (data: UserProfileFormData) => {
    setLoading(true);

    // 실제 API 호출을 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setProfile({
      ...data,
      interests: selectedInterests,
    });

    setLoading(false);

    // 성공 메시지 표시
    alert("프로필이 성공적으로 저장되었습니다!");
  };

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interest)) {
        return prev.filter((i) => i !== interest);
      } else if (prev.length < 5) {
        return [...prev, interest];
      }
      return prev;
    });

    form.setValue(
      "interests",
      selectedInterests.includes(interest)
        ? selectedInterests.filter((i) => i !== interest)
        : selectedInterests.length < 5
        ? [...selectedInterests, interest]
        : selectedInterests
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">자기소개 폼</CardTitle>
          <CardDescription className="text-center">
            React Hook Form, Zustand, Zod, Tailwind, shadcn/ui를 활용한 예제입니다.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* 이름 필드 */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이름</FormLabel>
                    <FormControl>
                      <Input placeholder="홍길동" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 이메일 필드 */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="example@email.com" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 나이 필드 */}
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>나이</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="25"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 자기소개 필드 */}
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>자기소개</FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="자신에 대해 간단히 소개해주세요..."
                        className="w-full min-h-[100px] p-3 border border-input bg-background rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>10-500자 사이로 작성해주세요.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 관심사 선택 */}
              <FormField
                control={form.control}
                name="interests"
                render={() => (
                  <FormItem>
                    <FormLabel>관심사 (최대 5개)</FormLabel>
                    <FormDescription className="mb-3">관심있는 분야를 선택해주세요.</FormDescription>
                    <div className="grid grid-cols-2 gap-2">
                      {interestOptions.map((interest) => (
                        <Button
                          key={interest}
                          type="button"
                          variant={selectedInterests.includes(interest) ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleInterestToggle(interest)}
                          className="justify-start"
                        >
                          {interest}
                        </Button>
                      ))}
                    </div>
                    <FormDescription>선택된 관심사: {selectedInterests.length}/5</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 제출 버튼 */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "저장 중..." : "프로필 저장"}
              </Button>
            </form>
          </Form>

          {/* 저장된 프로필 표시 */}
          {profile && (
            <div className="mt-8 p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-3">저장된 프로필:</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>이름:</strong> {profile.name}
                </p>
                <p>
                  <strong>이메일:</strong> {profile.email}
                </p>
                <p>
                  <strong>나이:</strong> {profile.age}세
                </p>
                <p>
                  <strong>자기소개:</strong> {profile.bio}
                </p>
                <p>
                  <strong>관심사:</strong> {profile.interests.join(", ")}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
