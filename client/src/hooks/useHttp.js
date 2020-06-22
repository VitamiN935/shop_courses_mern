import {useCallback, useState} from "react";

export const useHttp = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null)

	const clearError = useCallback(() => setError(null), [])

	const request = useCallback(async (url, method = 'GET', body = null, headers = {}, loader = true) => {
		if (loader) {
			setLoading(true)
		}
		if (body) {
			body = JSON.stringify(body);
			headers['Content-Type'] = 'application/json';
		}
		try {
			const response = await fetch(url, {method, body, headers})
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message);
			}
			setLoading(false);
			return data;

		} catch (e) {
			setLoading(false);
			setError(e.message);
			throw e;
		}
	}, [])

	return {request, loading, error, clearError}
}