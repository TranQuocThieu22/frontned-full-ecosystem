'use client';
import { useState } from "react";

type ComponentScore = {
    name: string;
    clo: "CTDL1" | "CTDL2" | "LTHDT1" | "LTHDT2" | "CSDL1" | "CSDL2" | "MMT1" | "MMT2" | "HQT1" | "HQT2" | "WEB1" | "WEB2";
    wBai: number;   // tỉ trọng bài trong môn
    wClo: number;   // tỉ trọng CLO trong bài
    dmax: number;
};
const COMPONENTS: ComponentScore[] = [
    // CLO1
    { name: "A", clo: "CTDL1", wBai: 0.2, wClo: 1.0, dmax: 10 },
    // { name: "B", clo: "CLO1", wBai: 0.2, wClo: 0.5, dmax: 5 },

    // CLO2
    { name: "B", clo: "CTDL2", wBai: 0.2, wClo: 1.0, dmax: 10 },
    // { name: "B", clo: "CLO2", wBai: 0.2, wClo: 0.5, dmax: 20 },

    // CLO3
    { name: "C", clo: "LTHDT1", wBai: 0.6, wClo: 0.1, dmax: 10 },
    { name: "C", clo: "LTHDT2", wBai: 0.6, wClo: 0.1, dmax: 10 },
    { name: "C", clo: "CSDL1", wBai: 0.6, wClo: 0.1, dmax: 10 },
    { name: "C", clo: "CSDL2", wBai: 0.6, wClo: 0.1, dmax: 10 },
    { name: "C", clo: "MMT1", wBai: 0.6, wClo: 0.1, dmax: 10 },
    { name: "C", clo: "MMT2", wBai: 0.6, wClo: 0.1, dmax: 10 },
    { name: "C", clo: "HQT1", wBai: 0.6, wClo: 0.1, dmax: 10 },
    { name: "C", clo: "HQT2", wBai: 0.6, wClo: 0.1, dmax: 10 },
    { name: "C", clo: "WEB1", wBai: 0.6, wClo: 0.1, dmax: 10 },
    { name: "C", clo: "WEB2", wBai: 0.6, wClo: 0.1, dmax: 10 },

];

// let CLOList = ["CLO1", "CLO2", "CLO3"];
let CLOList = ["CTDL1", "CTDL2", "LTHDT1", "LTHDT2", "CSDL1", "CSDL2", "MMT1", "MMT2", "HQT1", "HQT2", "WEB1", "WEB2"]

export default function Page() {

    const [rawScores, setRawScores] = useState<Record<string, number>>({});

    const getCoverage = (clo: string) =>
        COMPONENTS.filter(i => i.clo === clo)
            .reduce((s, i) => s + i.wBai * i.wClo, 0);

    const getBaiCoverage = (clo: string, bai: string) =>
        COMPONENTS.filter(i => i.clo === clo && i.name === bai)[0]?.wBai ?? 0;

    const calcTTP_WCoverage = (clo: string) => {
        const items = COMPONENTS.filter(i => i.clo === clo);
        const coverage = items.reduce(
            (s, i) => s + i.wBai * i.wClo,
            0
        );

        const sum = items.reduce((s, i) => {
            const key = `${clo}-${i.name}`;
            const d = rawScores[key] ?? 0;
            const w = i.wBai * i.wClo;
            return s + (d / i.dmax) * 10 * w;
        }, 0);

        return coverage === 0 ? 0 : sum / coverage;
    };

    const calcPO_WCoverage = (clo: string) => {
        const items = COMPONENTS.filter(i => i.clo === clo);

        const total = items.reduce(
            (acc, i) => {
                const key = `${clo}-${i.name}`;
                const d = rawScores[key] ?? 0;
                const w = i.wBai * i.wClo;
                return {
                    d: acc.d + d * w,
                    dmax: acc.dmax + i.dmax * w,
                };
            },
            { d: 0, dmax: 0 }
        );

        return total.dmax === 0 ? 0 : (total.d / total.dmax) * 10;
    };

    const calcPO_WBai = (clo: string) => {
        const items = COMPONENTS.filter(i => i.clo === clo);

        const total = items.reduce(
            (acc, i) => {
                const key = `${clo}-${i.name}`;
                const d = rawScores[key] ?? 0;
                return {
                    d: acc.d + d * i.wBai,
                    dmax: acc.dmax + i.dmax * i.wBai,
                };
            },
            { d: 0, dmax: 0 }
        );

        return total.dmax === 0 ? 0 : (total.d / total.dmax) * 10;
    };

    const calcCLOByWCoverage_CLOiByTTPByWCoverage = () => {
        let totalCLOPoint = CLOList.reduce((sum, clo) => {
            let CLOPoint = calcTTP_WCoverage(clo);
            console.log('calcCLOByWCoverage_CLOiByTTPByWCoverage: ', clo, ": ", CLOPoint);
            let CLOCoverage = getCoverage(clo);
            console.log('calcCLOByWCoverage_CLOiByTTPByWCoverage after sum: ', clo, ": ", CLOPoint * CLOCoverage);
            return sum + CLOPoint * CLOCoverage;
        }, 0);

        let totalCLOCoverage = CLOList.reduce((sum, clo) => {
            return sum + getCoverage(clo);
        }, 0);

        return totalCLOPoint / totalCLOCoverage;
    }

    const calcCLOByWCoverage_CLOiByPOByWCoverage = () => {
        let totalCLOPoint = CLOList.reduce((sum, clo) => {
            let CLOPoint = calcPO_WCoverage(clo);
            console.log('calcCLOByWCoverage_CLOiByPOByWCoverage: ', clo, ": ", CLOPoint);
            let CLOCoverage = getCoverage(clo);
            console.log('calcCLOByWCoverage_CLOiByPOByWCoverage after sum: ', clo, ": ", CLOPoint * CLOCoverage);
            return sum + CLOPoint * CLOCoverage;
        }, 0);

        let totalCLOCoverage = CLOList.reduce((sum, clo) => {
            return sum + getCoverage(clo);
        }, 0);

        return totalCLOPoint / totalCLOCoverage;
    }

    const calcCLOByWCoverage_CLOiByPOByWBai = () => {
        let totalCLOPoint = CLOList.reduce((sum, clo) => {
            let CLOPoint = calcPO_WBai(clo);
            let CLOCoverage = getCoverage(clo);
            return sum + CLOPoint * CLOCoverage;
        }, 0);

        let totalCLOCoverage = CLOList.reduce((sum, clo) => {
            return sum + getCoverage(clo);
        }, 0);
        return totalCLOPoint / totalCLOCoverage;
    }

    const calCLOiByAverageStandardlizeFirst = (clo: string) => {
        let items = COMPONENTS.filter(i => i.clo === clo)

        const total = items.reduce((sum, i) => {
            const key = `${clo}-${i.name}`;
            const d = rawScores[key] ?? 0;
            return sum + (d / i.dmax) * 10;
        }, 0);

        return total / items.length;
    }

    const calCLOiByAverageStandardlizeAfter = (clo: string) => {
        let items = COMPONENTS.filter(i => i.clo === clo)

        const total = items.reduce((sum, i) => {
            const key = `${clo}-${i.name}`;
            const d = rawScores[key] ?? 0;
            return {
                d: sum.d + d,
                dmax: sum.dmax + i.dmax
            }
        }, {
            d: 0,
            dmax: 0
        });

        return ((total.d / items.length) / (total.dmax / items.length)) * 10;
    }

    const calcCLOByWCoverage_CLOiByPOByAverageCHT = () => {
        let totalCLOPoint = CLOList.reduce((sum, clo) => {
            let CLOPoint = calCLOiByAverageStandardlizeFirst(clo);
            let CLOCoverage = getCoverage(clo);
            return sum + CLOPoint * CLOCoverage;
        }, 0);

        let totalCLOCoverage = CLOList.reduce((sum, clo) => {
            return sum + getCoverage(clo);
        }, 0);
        return totalCLOPoint / totalCLOCoverage;
    }

    const calcCLOByWCoverage_CLOiByPOByAverageCHS = () => {
        let totalCLOPoint = CLOList.reduce((sum, clo) => {
            let CLOPoint = calCLOiByAverageStandardlizeAfter(clo);
            let CLOCoverage = getCoverage(clo);
            return sum + CLOPoint * CLOCoverage;
        }, 0);

        let totalCLOCoverage = CLOList.reduce((sum, clo) => {
            return sum + getCoverage(clo);
        }, 0);
        return totalCLOPoint / totalCLOCoverage;
    }

    return (
        <div style={{ padding: 24, maxWidth: 900 }}>
            <h2>CLO Calculator – CT TTP vs CT PO</h2>

            <div style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 64,
                width: "1200px",
            }}>
                <div>
                    <h3>Input – Điểm thô sinh viên</h3>
                    <table border={1} cellPadding={6} style={{ marginBottom: 24 }}>
                        <thead>
                            <tr>
                                <th>CLO</th>
                                <th>Bài</th>
                                <th>Điểm SV</th>
                                <th>Điểm max</th>
                                <th>w bài</th>
                                <th>w CLO/bài</th>
                                <th>w = wbai×wclo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {COMPONENTS.map((c, idx) => {
                                const key = `${c.clo}-${c.name}`;
                                return (
                                    <tr key={idx}>
                                        <td>{c.clo}</td>
                                        <td>{c.name}</td>
                                        <td>
                                            <input
                                                type="number"
                                                value={rawScores[key] ?? ""}
                                                onChange={e =>
                                                    setRawScores({
                                                        ...rawScores,
                                                        [key]: Number(e.target.value),
                                                    })
                                                }
                                                style={{ width: 60 }}
                                            />
                                        </td>
                                        <td>{c.dmax}</td>
                                        <td>{c.wBai}</td>
                                        <td>{c.wClo}</td>
                                        <td>{(c.wBai * c.wClo).toFixed(2)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div>
                    <h3>CLO Coverage</h3>

                    <table border={1} cellPadding={6} style={{ marginBottom: 24 }}>
                        <thead>
                            <tr>
                                <th>CLO</th>
                                <th>Σ (wBai × wClo)</th>
                                <th>Ý nghĩa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {CLOList.map(clo => (
                                <tr key={clo}>
                                    <td>{clo}</td>
                                    <td>{getCoverage(clo).toFixed(2)}</td>
                                    <td>
                                        Tổng mức độ CLO này được đánh giá trong toàn bộ môn học
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

            <hr style={{ margin: "24px 0" }} />

            <h3>Kết quả</h3>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gap: 16,
                }}
            >
                <ResultBox title="CLO TT - CHT - wBai x wClo">
                    {CLOList.map(clo => (
                        <div key={clo}>{clo}: {calcTTP_WCoverage(clo).toFixed(2)}</div>
                    ))}
                    <hr style={{ margin: "12px 0" }} />
                    <div>
                        <a>Điểm CLO Môn học wCoverage: </a>
                        {calcCLOByWCoverage_CLOiByPOByWCoverage().toFixed(2)}
                    </div>
                </ResultBox>

                <ResultBox title="CLO TT - CHS - wBai x wClo">
                    {CLOList.map(clo => (
                        <div key={clo}>{clo}: {calcPO_WCoverage(clo).toFixed(2)}</div>
                    ))}
                    <hr style={{ margin: "12px 0" }} />
                    <div>
                        <a>Điểm CLO Môn học wCoverage: </a>
                        {calcCLOByWCoverage_CLOiByTTPByWCoverage().toFixed(2)}
                    </div>
                </ResultBox>

                <ResultBox title="CLO TT - CHS - wBai (main)">
                    {CLOList.map(clo => (
                        <div key={clo}>{clo}: {calcPO_WBai(clo).toFixed(2)}</div>
                    ))}
                    <hr style={{ margin: "12px 0" }} />
                    <div>
                        <a>Điểm CLO Môn học wCoverage: </a>
                        {calcCLOByWCoverage_CLOiByPOByWBai().toFixed(2)}
                    </div>
                </ResultBox>

                <ResultBox title="CLO TBC - CHT -wTBC">
                    {CLOList.map(clo => (
                        <div key={clo}>{clo}: {calCLOiByAverageStandardlizeFirst(clo).toFixed(2)}</div>
                    ))}
                    <hr style={{ margin: "12px 0" }} />
                    <div>
                        <a>Điểm CLO Môn học wCoverage: </a>
                        {calcCLOByWCoverage_CLOiByPOByAverageCHT().toFixed(2)}
                    </div>
                </ResultBox>

                <ResultBox title="CLO TBC - CHS -wTBC">
                    {CLOList.map(clo => (
                        <div key={clo}>{clo}: {calCLOiByAverageStandardlizeAfter(clo).toFixed(2)}</div>
                    ))}
                    <hr style={{ margin: "12px 0" }} />
                    <div>
                        <a>Điểm CLO Môn học wCoverage: </a>
                        {calcCLOByWCoverage_CLOiByPOByAverageCHS().toFixed(2)}
                    </div>
                </ResultBox>


            </div>
        </div>
    );
}

const ResultBox = ({ title, children }: any) => (
    <div style={{ border: "1px solid #ccc", padding: 12 }}>
        <h4>{title}</h4>
        {children}
    </div>
);