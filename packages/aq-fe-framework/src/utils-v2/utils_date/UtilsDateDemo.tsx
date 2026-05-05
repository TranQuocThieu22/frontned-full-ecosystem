// DateUtilsInteractive.tsx
import { Paper } from "@mantine/core";
import { useState } from "react";
import { utils_date } from "./utils_date";

export default function UtilsDateDemo() {
    const [input, setInput] = useState<string>(new Date().toISOString());

    const parsedDate = new Date(input);

    return (
        <Paper style={{ padding: 16, fontFamily: "monospace", maxWidth: 500 }}>
            <label style={{ display: "block", marginBottom: 8 }}>
                Nhập ngày (ISO string hoặc yyyy-mm-dd):{" "}
            </label>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{
                    width: "100%",
                    padding: 8,
                    marginBottom: 16,
                    border: "1px solid #ccc",
                    borderRadius: 4,
                }}
            />

            {isNaN(parsedDate.getTime()) ? (
                <p style={{ color: "red" }}>❌ Ngày không hợp lệ</p>
            ) : (
                <div>
                    <p><strong>Input Date:</strong> {parsedDate.toString()}</p>
                    <p><strong>toDDMMYYYY:</strong> {utils_date.toDDMMYYYY(parsedDate)}</p>
                    <p><strong>toMMYYYY:</strong> {utils_date.toMMYYYY(parsedDate)}</p>
                    <p><strong>toHHmm:</strong> {utils_date.toHHmm(parsedDate)}</p>
                    <p><strong>toDateTime:</strong> {utils_date.toDateTime(parsedDate, true)}</p>
                    <p>
                        <strong>toDateTimeStartEnd:</strong>{" "}
                        {utils_date.toDateTimeStartEnd(
                            parsedDate,
                            new Date(parsedDate.getTime() + 2 * 60 * 60 * 1000) // cộng thêm 2h
                        )}
                    </p>
                </div>
            )}
        </Paper>
    );
}
