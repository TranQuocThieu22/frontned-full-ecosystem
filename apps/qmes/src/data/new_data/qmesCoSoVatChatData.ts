import { Category } from "./IqmesViewModel";

export const co_so_vat_chat: Category = {
    id: 3,
    code: "3",
    name: "Cơ sở vật chất",
    criteria: [
        {
            id: 31,
            code: "3.1",
            title: "Diện tích đất bình quân trên một người học (tối thiểu 25m2)",
            description: "Tổng diện tích đất sử dụng cho giáo dục chia cho tổng số người học.",
            unit: "m2",
            threshold: 25,
            thresholdType: "min",
            type: "area",
            value: 32,
            pass: true,
            details: [
                { id: 311, code: "2024-Q1", value: 8, startDate: new Date(2024,0,1), endDate: new Date(2024,2,31), decisionAuthority: "Hiệu trưởng", published: true, description: "Diện tích đất Q1-2024.", type: "area" },
                { id: 312, code: "2024-Q2", value: 8, startDate: new Date(2024,3,1), endDate: new Date(2024,5,30), decisionAuthority: "Phó Hiệu trưởng", published: true, description: "Diện tích đất Q2-2024.", type: "area" },
                { id: 313, code: "2024-Q3", value: 8, startDate: new Date(2024,6,1), endDate: new Date(2024,8,30), decisionAuthority: "Ban Giám hiệu", published: true, description: "Diện tích đất Q3-2024.", type: "area" },
                { id: 314, code: "2024-Q4", value: 8, startDate: new Date(2024,9,1), endDate: new Date(2024,11,31), decisionAuthority: "Hội đồng trường", published: true, description: "Diện tích đất Q4-2024.", type: "area" }
            ]
        },
        {
            id: 32,
            code: "3.2.1",
            title: "Diện tích sàn xây dựng phục vụ đào tạo (tối thiểu 2.8m2)",
            description: "Diện tích sàn phục vụ đào tạo cho tất cả ngành học.",
            unit: "m2",
            threshold: 2.8,
            thresholdType: "min",
            type: "area",
            value: 3.2,
            pass: true,
            details: [
                { id: 321, code: "2024-Q1", value: 0.8, startDate: new Date(2024,0,1), endDate: new Date(2024,2,31), decisionAuthority: "Phòng CSVC", published: true, description: "Diện tích sàn Q1-2024.", type: "area" },
                { id: 322, code: "2024-Q2", value: 0.8, startDate: new Date(2024,3,1), endDate: new Date(2024,5,30), decisionAuthority: "Hiệu trưởng", published: true, description: "Diện tích sàn Q2-2024.", type: "area" },
                { id: 323, code: "2024-Q3", value: 0.8, startDate: new Date(2024,6,1), endDate: new Date(2024,8,30), decisionAuthority: "Phó Hiệu trưởng", published: true, description: "Diện tích sàn Q3-2024.", type: "area" },
                { id: 324, code: "2024-Q4", value: 0.8, startDate: new Date(2024,9,1), endDate: new Date(2024,11,31), decisionAuthority: "Ban Giám hiệu", published: true, description: "Diện tích sàn Q4-2024.", type: "area" }
            ]
        },
        {
            id: 33,
            code: "3.2.2",
            title: "Giảng viên toàn thời gian được bố trí chỗ làm việc riêng biệt (tối thiểu 70%)",
            description: "Đảm bảo mỗi giảng viên toàn thời gian có chỗ làm việc riêng.",
            unit: "%",
            threshold: 70,
            thresholdType: "min",
            type: "ratio",
            value: 85,
            pass: true,
            details: [
                { id: 331, code: "2024-Q1", value: 20, startDate: new Date(2024,0,1), endDate: new Date(2024,2,31), decisionAuthority: "Phòng CSVC", published: true, description: "Tỷ lệ bố trí chỗ làm việc Q1-2024.", type: "ratio" },
                { id: 332, code: "2024-Q2", value: 22, startDate: new Date(2024,3,1), endDate: new Date(2024,5,30), decisionAuthority: "Hiệu trưởng", published: true, description: "Tỷ lệ bố trí chỗ làm việc Q2-2024.", type: "ratio" },
                { id: 333, code: "2024-Q3", value: 21, startDate: new Date(2024,6,1), endDate: new Date(2024,8,30), decisionAuthority: "Phó Hiệu trưởng", published: true, description: "Tỷ lệ bố trí chỗ làm việc Q3-2024.", type: "ratio" },
                { id: 334, code: "2024-Q4", value: 22, startDate: new Date(2024,9,1), endDate: new Date(2024,11,31), decisionAuthority: "Ban Giám hiệu", published: true, description: "Tỷ lệ bố trí chỗ làm việc Q4-2024.", type: "ratio" }
            ]
        },
        {
            id: 34,
            code: "3.3.1",
            title: "Số đầu sách giáo trình, chuyên khảo bình quân mỗi ngành ở mỗi trình độ (tối thiểu 40)",
            description: "Số lượng đầu sách phục vụ đào tạo trên mỗi ngành và trình độ.",
            unit: "quyển",
            threshold: 40,
            thresholdType: "min",
            type: "count",
            value: 50,
            pass: true,
            details: [
                { id: 341, code: "2024-Q1", value: 12, startDate: new Date(2024,0,1), endDate: new Date(2024,2,31), decisionAuthority: "Thư viện", published: true, description: "Số đầu sách Q1-2024.", type: "count" },
                { id: 342, code: "2024-Q2", value: 12, startDate: new Date(2024,3,1), endDate: new Date(2024,5,30), decisionAuthority: "Hiệu trưởng", published: true, description: "Số đầu sách Q2-2024.", type: "count" },
                { id: 343, code: "2024-Q3", value: 13, startDate: new Date(2024,6,1), endDate: new Date(2024,8,30), decisionAuthority: "Phó Hiệu trưởng", published: true, description: "Số đầu sách Q3-2024.", type: "count" },
                { id: 344, code: "2024-Q4", value: 13, startDate: new Date(2024,9,1), endDate: new Date(2024,11,31), decisionAuthority: "Ban Giám hiệu", published: true, description: "Số đầu sách Q4-2024.", type: "count" }
            ]
        },
        {
            id: 35,
            code: "3.3.2",
            title: "Số đầu sách giáo trình, chuyên khảo bình quân 1 người học theo trình độ đào tạo (tối thiểu 5)",
            description: "Số đầu sách bình quân phục vụ 1 người học.",
            unit: "quyển/người",
            threshold: 5,
            thresholdType: "min",
            type: "ratio",
            value: 6.5,
            pass: true,
            details: [
                { id: 351, code: "2024-Q1", value: 1.6, startDate: new Date(2024,0,1), endDate: new Date(2024,2,31), decisionAuthority: "Thư viện", published: true, description: "Số đầu sách/người Q1-2024.", type: "ratio" },
                { id: 352, code: "2024-Q2", value: 1.6, startDate: new Date(2024,3,1), endDate: new Date(2024,5,30), decisionAuthority: "Hiệu trưởng", published: true, description: "Số đầu sách/người Q2-2024.", type: "ratio" },
                { id: 353, code: "2024-Q3", value: 1.6, startDate: new Date(2024,6,1), endDate: new Date(2024,8,30), decisionAuthority: "Phó Hiệu trưởng", published: true, description: "Số đầu sách/người Q3-2024.", type: "ratio" },
                { id: 354, code: "2024-Q4", value: 1.7, startDate: new Date(2024,9,1), endDate: new Date(2024,11,31), decisionAuthority: "Ban Giám hiệu", published: true, description: "Số đầu sách/người Q4-2024.", type: "ratio" }
            ]
        },
        {
            id: 36,
            code: "3.4.1",
            title: "Số học phần sẵn sàng dạy trực tuyến trên tổng số học phần dạy trong năm (tối thiểu 10%)",
            description: "Tỷ lệ học phần có thể dạy trực tuyến.",
            unit: "%",
            threshold: 10,
            thresholdType: "min",
            type: "ratio",
            value: 18,
            pass: true,
            details: [
                { id: 361, code: "2024-Q1", value: 4, startDate: new Date(2024,0,1), endDate: new Date(2024,2,31), decisionAuthority: "Phòng Đào tạo", published: true, description: "Học phần trực tuyến Q1-2024.", type: "ratio" },
                { id: 362, code: "2024-Q2", value: 5, startDate: new Date(2024,3,1), endDate: new Date(2024,5,30), decisionAuthority: "Hiệu trưởng", published: true, description: "Học phần trực tuyến Q2-2024.", type: "ratio" },
                { id: 363, code: "2024-Q3", value: 4, startDate: new Date(2024,6,1), endDate: new Date(2024,8,30), decisionAuthority: "Phó Hiệu trưởng", published: true, description: "Học phần trực tuyến Q3-2024.", type: "ratio" },
                { id: 364, code: "2024-Q4", value: 5, startDate: new Date(2024,9,1), endDate: new Date(2024,11,31), decisionAuthority: "Ban Giám hiệu", published: true, description: "Học phần trực tuyến Q4-2024.", type: "ratio" }
            ]
        },
        {
            id: 37,
            code: "3.4.2",
            title: "Băng thông trên 1000 người học không thấp hơn băng thông cố định của Việt Nam",
            description: "Đảm bảo băng thông đủ cho tối thiểu 1000 người học.",
            unit: "Mbps",
            threshold: 100,
            thresholdType: "min",
            type: "area",
            value: 130,
            pass: true,
            details: [
                { id: 371, code: "2024-Q1", value: 32, startDate: new Date(2024,0,1), endDate: new Date(2024,2,31), decisionAuthority: "Phòng CNTT", published: true, description: "Băng thông Q1-2024.", type: "area" },
                { id: 372, code: "2024-Q2", value: 32, startDate: new Date(2024,3,1), endDate: new Date(2024,5,30), decisionAuthority: "Hiệu trưởng", published: true, description: "Băng thông Q2-2024.", type: "area" },
                { id: 373, code: "2024-Q3", value: 33, startDate: new Date(2024,6,1), endDate: new Date(2024,8,30), decisionAuthority: "Phó Hiệu trưởng", published: true, description: "Băng thông Q3-2024.", type: "area" },
                { id: 374, code: "2024-Q4", value: 33, startDate: new Date(2024,9,1), endDate: new Date(2024,11,31), decisionAuthority: "Ban Giám hiệu", published: true, description: "Băng thông Q4-2024.", type: "area" }
            ]
        }
    ]
};
