// src/hooks/useLoadConfig.ts
import type { AxiosInstance } from 'axios';
import { useEffect, useState } from 'react';
import axiosLocal from "../configs/axiosInstance";

export const useLoadAxiosConfig = ({
  axiosInstance = axiosLocal,
  aqModule,
  url,
  prefix = "",
}: {
  axiosInstance?: AxiosInstance;
  aqModule: string,
  url?: string;
  prefix?: string;
}) => {
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const res = await fetch(`${prefix}/config.json?v` + Date.now());
        const config = await res.json();
        const finalUrl = url ? url : config.baseURL;

        // ✅ Set baseURL
        axiosInstance.defaults.baseURL = finalUrl;
        axiosLocal.defaults.baseURL = finalUrl;

        // ✅ Thêm header mặc định
        axiosInstance.defaults.headers.common['X-Aqmodule'] = aqModule;
        axiosLocal.defaults.headers.common['X-Aqmodule'] = aqModule;

        setFlag(true);
      } catch (err) {
        console.error('❌ Lỗi khi load config.json:', err);
      }
    };

    loadConfig();
  }, [axiosInstance, url, prefix]);


  return { flag, setFlag };
};
