// types/axiosInterface.ts
/*import { AxiosInstance, AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse } from 'axios';

type CustomAxiosResponse<T = any> = {
    response?: T;
    refreshToken?: string;
};

export interface CustomAxiosInterface extends AxiosInstance {
    interceptors: {
        request: AxiosInterceptorManager<AxiosRequestConfig>;
        response: AxiosInterceptorManager<AxiosResponse<CustomAxiosResponse>>;
    };

    get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
}*/

/**2023/05/05 - 로그인 시 서버로 요청하는 axios 타입 - 박수범 */
export interface LoginPost {
    access_token?: string;
    refresh_token?: string;
}
