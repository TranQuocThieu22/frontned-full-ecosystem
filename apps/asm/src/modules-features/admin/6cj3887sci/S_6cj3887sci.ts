import { createGenericStore } from "@/stores/S0GenericStore";

interface ITietHoc {
  id?: number;
  tietThu?: number;
  thuHai?: boolean;
  thuBa?: boolean;
  thuTu?: boolean;
  thuNam?: boolean;
  thuSau?: boolean;
  thuBay?: boolean;
  chuNhat?: boolean;
  ngayCapNhat?: Date;
  nguoiCapNhat?: string;
}

interface I {
  data?: ITietHoc[];
  buoiSang?: boolean,
  buoiChieu?: boolean,
  buoiToi?: boolean,
}

interface BuoiRange {
  start: number;
  end: number;
  value: boolean;
}

interface BuoiUpdate {
  sang?: BuoiRange;
  chieu?: BuoiRange;
  toi?: BuoiRange;
}


const useStore = createGenericStore<I>(
  {
    data: [
      {
        id: 1,
        tietThu: 1,
        thuHai: false,
        thuBa: false,
        thuTu: false,
        thuNam: false,
        thuSau: false,
        thuBay: false,
        chuNhat: false,
        ngayCapNhat: new Date(),
        nguoiCapNhat: "User1",
      },
      {
        id: 2,
        tietThu: 2,
        thuHai: false,
        thuBa: false,
        thuTu: false,
        thuNam: false,
        thuSau: false,
        thuBay: false,
        chuNhat: false,
        ngayCapNhat: new Date(),
        nguoiCapNhat: "User2",
      },
      {
        id: 3,
        tietThu: 3,
        thuHai: false,
        thuBa: false,
        thuTu: false,
        thuNam: false,
        thuSau: false,
        thuBay: false,
        chuNhat: false,
        ngayCapNhat: new Date(),
        nguoiCapNhat: "User3",
      },
      {
        id: 4,
        tietThu: 4,
        thuHai: false,
        thuBa: false,
        thuTu: false,
        thuNam: false,
        thuSau: false,
        thuBay: false,
        chuNhat: false,
        ngayCapNhat: new Date(),
        nguoiCapNhat: "User4",
      },
      {
        id: 5,
        tietThu: 5,
        thuHai: false,
        thuBa: false,
        thuTu: false,
        thuNam: false,
        thuSau: false,
        thuBay: false,
        chuNhat: false,
        ngayCapNhat: new Date(),
        nguoiCapNhat: "User5",
      },
      {
        id: 6,
        tietThu: 6,
        thuHai: false,
        thuBa: false,
        thuTu: false,
        thuNam: false,
        thuSau: false,
        thuBay: false,
        chuNhat: false,
        ngayCapNhat: new Date(),
        nguoiCapNhat: "User6",
      },
      {
        id: 7,
        tietThu: 7,
        thuHai: false,
        thuBa: false,
        thuTu: false,
        thuNam: false,
        thuSau: false,
        thuBay: false,
        chuNhat: false,
        ngayCapNhat: new Date(),
        nguoiCapNhat: "User7",
      },
      {
        id: 8,
        tietThu: 8,
        thuHai: false,
        thuBa: false,
        thuTu: false,
        thuNam: false,
        thuSau: false,
        thuBay: false,
        chuNhat: false,
        ngayCapNhat: new Date(),
        nguoiCapNhat: "User8",
      },
      {
        id: 9,
        tietThu: 9,
        thuHai: false,
        thuBa: false,
        thuTu: false,
        thuNam: false,
        thuSau: false,
        thuBay: false,
        chuNhat: false,
        ngayCapNhat: new Date(),
        nguoiCapNhat: "User9",
      },
      {
        id: 10,
        tietThu: 10,
        thuHai: false,
        thuBa: false,
        thuTu: false,
        thuNam: false,
        thuSau: false,
        thuBay: false,
        chuNhat: false,
        ngayCapNhat: new Date(),
        nguoiCapNhat: "User10",
      },
      {
        id: 11,
        tietThu: 11,
        thuHai: false,
        thuBa: false,
        thuTu: false,
        thuNam: false,
        thuSau: false,
        thuBay: false,
        chuNhat: false,
        ngayCapNhat: new Date(),
        nguoiCapNhat: "User11",
      },
      {
        id: 12,
        tietThu: 12,
        thuHai: false,
        thuBa: false,
        thuTu: false,
        thuNam: false,
        thuSau: false,
        thuBay: false,
        chuNhat: false,
        ngayCapNhat: new Date(),
        nguoiCapNhat: "User12",
      },
      {
        id: 13,
        tietThu: 13,
        thuHai: false,
        thuBa: false,
        thuTu: false,
        thuNam: false,
        thuSau: false,
        thuBay: false,
        chuNhat: false,
        ngayCapNhat: new Date(),
        nguoiCapNhat: "User13",
      },
      {
        id: 14,
        tietThu: 14,
        thuHai: false,
        thuBa: false,
        thuTu: false,
        thuNam: false,
        thuSau: false,
        thuBay: false,
        chuNhat: false,
        ngayCapNhat: new Date(),
        nguoiCapNhat: "User14",
      },
      {
        id: 15,
        tietThu: 15,
        thuHai: false,
        thuBa: false,
        thuTu: false,
        thuNam: false,
        thuSau: false,
        thuBay: false,
        chuNhat: false,
        ngayCapNhat: new Date(),
        nguoiCapNhat: "User15",
      },
    ],
    buoiSang: false,
    buoiChieu: false,
    buoiToi: false,
  },
  "6cj3887sci"
);

export function useS_6cj3887sci() {
  const store = useStore();

  const toggleThu = (id: number, thu: keyof ITietHoc) => {
    const oldData = store.state.data;
    const newData = oldData!.map((item) => {
      if (item.id === id) {
        return { ...item, [thu]: !item[thu] };
      }
      return item;
    });

    return store.setProperty("data", newData);
  };
  const getBooleanByThuVaId = (id: number, thu: keyof ITietHoc) => {
    const item = store.state.data!.find((item) => item.id === id);
    return item![thu] as boolean;
  };


  const setAllThuFalse = () => {
    const oldData = store.state.data;
    const newData = oldData!.map((item) => ({
      ...item,
      thuHai: false,
      thuBa: false,
      thuTu: false,
      thuNam: false,
      thuSau: false,
      thuBay: false,
      chuNhat: false,
    }));
    store.setState({
      ...store.state,
      buoiSang: false,
      buoiChieu: false,
      buoiToi: false,
    })
    return store.setProperty("data", newData);
  };
  const setBuoiMultiple = (updates: BuoiUpdate) => {
    const oldData = store.state.data;
    let newData = [...oldData!];

    // Process all updates in a single pass
    newData = newData.map(item => {
      const tiet = item.tietThu!;
      let shouldUpdate = false;
      let newValue = false;

      // Check sang
      if (updates.sang && tiet >= updates.sang.start && tiet <= updates.sang.end) {
        shouldUpdate = true;
        newValue = updates.sang.value;
      }
      // Check chieu
      else if (updates.chieu && tiet >= updates.chieu.start && tiet <= updates.chieu.end) {
        shouldUpdate = true;
        newValue = updates.chieu.value;
      }
      // Check toi
      else if (updates.toi && tiet >= updates.toi.start && tiet <= updates.toi.end) {
        shouldUpdate = true;
        newValue = updates.toi.value;
      }

      if (shouldUpdate) {
        return {
          ...item,
          thuHai: newValue,
          thuBa: newValue,
          thuTu: newValue,
          thuNam: newValue,
          thuSau: newValue,
          thuBay: newValue,
          chuNhat: newValue,
        };
      }

      return item;
    });

    return store.setProperty("data", newData);
  };
  return {
    ...store,
    toggleThu,
    getBooleanByThuVaId,
    setAllThuFalse,
    setBuoiMultiple
  };
}
