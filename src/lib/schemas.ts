import { z } from "zod";

// 교회 자기소개 폼 스키마
export const churchIntroSchema = z.object({
  name: z.string().min(2, "이름은 최소 2글자 이상이어야 합니다.").max(50, "이름은 50글자를 초과할 수 없습니다."),

  birthDate: z
    .string()
    .min(1, "생년월일을 입력해주세요.")
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 0 && age <= 120;
    }, "올바른 생년월일을 입력해주세요."),

  occupation: z
    .string()
    .min(2, "하는 일/전공을 입력해주세요.")
    .max(100, "하는 일/전공은 100글자를 초과할 수 없습니다."),

  location: z.string().min(2, "사는 곳을 입력해주세요.").max(100, "사는 곳은 100글자를 초과할 수 없습니다."),

  baptized: z.enum(["yes", "no"], {
    message: "세례 여부를 선택해주세요.",
  }),

  churchHistory: z
    .string()
    .min(1, "사랑의 교회 출석 기간을 입력해주세요.")
    .max(200, "출석 기간은 200글자를 초과할 수 없습니다."),

  discipleshipThoughts: z
    .string()
    .min(1, "제자훈련에 대한 생각을 1글자 이상 작성해주세요.")
    .max(500, "제자훈련에 대한 생각은 500글자를 초과할 수 없습니다."),

  ministryTeam: z.string().max(100, "섬기는 사역팀은 100글자를 초과할 수 없습니다.").optional().or(z.literal("")),

  currentInterests: z
    .string()
    .min(1, "요즘 관심사를 1글자 이상 작성해주세요.")
    .max(300, "요즘 관심사는 300글자를 초과할 수 없습니다."),

  favoritePraise: z
    .string()
    .min(1, "좋아하는 찬양을 입력해주세요.")
    .max(300, "좋아하는 찬양은 300글자를 초과할 수 없습니다."),

  favoriteFood: z
    .string()
    .min(1, "좋아하는 음식을 입력해주세요.")
    .max(200, "좋아하는 음식은 200글자를 초과할 수 없습니다."),

  dislikedFood: z.string().max(200, "싫어하는 음식은 200글자를 초과할 수 없습니다.").optional().or(z.literal("")),

  prayerRequest: z
    .string()
    .min(1, "기도제목을 1글자 이상 작성해주세요.")
    .max(500, "기도제목은 500글자를 초과할 수 없습니다."),
});

export type ChurchIntroFormData = z.infer<typeof churchIntroSchema>;

// 세례 여부 옵션
export const baptismOptions = [
  { value: "yes", label: "예" },
  { value: "no", label: "아니요" },
] as const;
