import { client } from "@/api/client"

// 요청 DTO 인터페이스
export interface RequestDTO {
  page: number;
  skip: number;
  tag?: string;
}

// 고양이 데이터 구조 인터페이스
export interface CatDTO {
  _id: string;    // 고양이 ID
  mimetype: string; // MIME 타입
  size: number;   // 파일 크기
  tags: string[]; // 태그 배열
}

// 고양이 데이터 배열 인터페이스
export interface GetCatsDTO {
  cats: CatDTO[]; // CatDTO 배열을 포함하는 구조
}

// 고양이 데이터를 가져오는 함수
export const getCats = async ({ page, skip, tag }: RequestDTO): Promise<GetCatsDTO> => {
  const url = `/api/cats?page=${page}&skip=${skip}&tag=${tag}`;
  try {
    const { data } = await client.get<CatDTO[]>(url);
    return { cats: data }; // CatDTO 배열을 포함하는 객체 반환
  } catch (error) {
    console.error('에러내용:', error);
    throw new Error('실패');
  }
};
