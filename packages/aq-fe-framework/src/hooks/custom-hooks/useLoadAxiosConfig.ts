// src/hooks/useLoadConfig.ts
import baseAxios from '@/shared/config/baseAxios';
import type { AxiosInstance } from 'axios';
import { useEffect, useState } from 'react';

export const useLoadAxiosConfig = ({
  axiosInstance = baseAxios,
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
        const res = await fetch(`${prefix}/config.json`);
        const config = await res.json();
        const finalUrl = url ? url : config.baseURL;

        // ✅ Set baseURL
        axiosInstance.defaults.baseURL = finalUrl;
        baseAxios.defaults.baseURL = finalUrl;

        // ✅ Thêm header mặc định
        axiosInstance.defaults.headers.common['X-Aqmodule'] = aqModule;
        baseAxios.defaults.headers.common['X-Aqmodule'] = aqModule;

        console.log('✅ baseURL set to', finalUrl);
        console.log('✅ Header X-Aqmodule set to eaq');

        setFlag(true);
      } catch (err) {
        console.error('❌ Lỗi khi load config.json:', err);
      }
    };

    loadConfig();
  }, [axiosInstance, url, prefix]);

  return { flag, setFlag };
};
