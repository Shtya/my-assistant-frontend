'use client';

import { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

export function useApi(endpoint, {
    method = 'GET',
    body = null,
    successMsg = '',
    errorMsg = '',
    showSuccess = true,
    showError = true,
    autoFetch = true // optional to disable auto-fetch if needed
} = {}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const request = useCallback(async () => {
        setLoading(true);
        setError(null);
        setData(null);

        const url = process.env.NEXT_PUBLIC_API_URL + "/api/v1" + endpoint;

        try {
            // const authToken = Cookies.get('token'); // or hardcoded fallback if needed
            const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoiYWhtZWRAZ21haWwuY29tIiwicm9sZSI6Im1hbmFnZXIiLCJzdGF0dXMiOiJhY3RpdmUiLCJpYXQiOjE3NTAwMDk1ODcsImV4cCI6MTc1MDYxNDM4N30.z5ssz0Kl-2e_4cP1TPrzup7t-ooH82vGc0Nl92dj-oQ"
            const headers = { 'Content-Type': 'application/json' };
            if (authToken) headers['Authorization'] = `Bearer ${authToken}`;

            const res = await fetch(url, {
                method,
                headers,
                body: body ? JSON.stringify(body) : undefined,
            });

            const result = await res.json().catch(() => ({}));

            if (!res.ok) {
                if (showError) toast.error(errorMsg || result.message || 'Request failed');
                setError(errorMsg || result.message || 'Request failed');
                return null;
            }

            if (showSuccess && successMsg) {
                toast.success(successMsg);
            }

            setData(result);
            return result;

        } catch (err) {
            const fallbackMsg = errorMsg || 'Something went wrong';
            if (showError) toast.error(fallbackMsg);
            setError(fallbackMsg);
            return null;
        } finally {
            setLoading(false);
        }
    }, [endpoint, method, body, successMsg, errorMsg, showSuccess, showError]);

    // 🔁 Automatically call GET on mount
    useEffect(() => {
        if (method === 'GET' && autoFetch) {
            request();
        }
    }, [request, method, autoFetch]);

    return { request, loading, error, data };
}
