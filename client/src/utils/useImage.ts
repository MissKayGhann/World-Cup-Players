import { useEffect, useState } from "react";

const useImage = (fileName: string) => {
	const [image, setImage] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchImage = async () => {
			try {
				const res = await import(`../assets/${fileName}`);
				setImage(res.default);
			} catch (err: any) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		fetchImage();
	}, [fileName]);

	return { loading, image, error };
};

export default useImage;
