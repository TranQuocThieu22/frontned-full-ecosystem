import {ITaskDetailEvidence} from "@/shared/interfaces/evidence/ITaskDetailEvidence";

/**
 * 
 * @param list Danh sách đầu vào (có thể null hoặc undefined)
 * @returns true nếu danh sách rỗng,  ngược lại false
 */
export const isNullOrEmptyList = (list: ITaskDetailEvidence[] | undefined) => !list || list.length === 0;

/**
 * Lọc danh sách, lấy giá trị từ mỗi phần tử theo một selector, 
 * loại bỏ các giá trị null/undefined/empty string, rồi nối lại thành chuỗi.
 *
 * @param list Danh sách đầu vào (có thể null hoặc undefined)
 * @param selector Hàm chọn giá trị cần lấy từ từng phần tử
 * @param separator Ký tự hoặc chuỗi dùng để nối các giá trị (mặc định: ", \n")
 * @returns Chuỗi nối từ các giá trị hợp lệ, hoặc chuỗi rỗng nếu không có phần tử hợp lệ
 */
export function mapAndJoinStrings<T>(
    list: T[] | undefined | null,
    selector: (item: T) => string | undefined | null,
    separator: string = ", \n"
): string {
    if (!list || list.length === 0) return "";

    return list
        // Lấy giá trị từ từng phần tử
        .map(selector)
        // Loại bỏ các giá trị null, undefined hoặc chuỗi rỗng
        .filter((value): value is string => Boolean(value && value.trim() !== ""))
        // Nối lại thành một chuỗi duy nhất
        .join(separator);
}
