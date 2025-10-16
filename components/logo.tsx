import Image from "next/image";

export const Logo = () => {
	return (
		<Image
			src="/logo.png"
			alt="Logo"
			width={24}
			height={24}
			className="w-6 h-6"
		/>
	);
};
