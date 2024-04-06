export interface Product {
	id: number;
	name: string;
	price: string;
	images: string[];
	soldNum: number;
	selections: {
		name: string;
		varieties: string[];
	}[];
	description: string;
}
export const useDummyProducts = () => {
	let dummyProducts: Product[] = [
		{
			id: 1,
			name: "Dr Shiba Happy Tummy Healthy Dog Treats Snack - Dog Multivitamins - Dog Food for Digestive Care",
			price: "₱499",
			images: [
				"/images/shop-products/01/01.jpg",
				"/images/shop-products/01/02.jpg",
				"/images/shop-products/01/03.jpg",
				"/images/shop-products/01/04.jpg",
				"/images/shop-products/01/05.jpg",
				"/images/shop-products/01/06.jpg",
				"/images/shop-products/01/07.jpg",
				"/images/shop-products/01/08.jpg",
			],
			soldNum: 30125,
			selections: [{ name: "Flavour", varieties: ["Beef", "Duck", "Salmon", "Suprise Me!"] }],
			description:
				"😋 HAPPY TUMMY\r\nㅤ\r\n🐾 Indulge your beloved furry friend with Happy Tummy by Dr. Shiba, specially crafted to be their ultimate source of delight and nutrition. These treats for dogs are more than just a tasty reward; they are a pathway to worry-free days for your loyal companion. \r\nㅤ\r\n🐾 Our protein-rich blend, featuring high-quality beef, chicken, and salmon, not only tantalizes your pup's taste buds but also provides essential nutrients. Dr. Shiba's Happy Tummy includes pre-and probiotics, which promote the growth of beneficial gut bacteria and aid in digestion.\r\nㅤ\r\nㅤ\r\n🌟 Benefits \r\nㅤ\r\n🐾 Improved Digestion: Dr. Shiba's Happy Tummy soothes dogs' tummy troubles, reduces bloating, and ensures smoother digestion. Say goodbye to discomfort and hello to a happier, more comfortable pup.\r\nㅤ\r\n🐾 Regulated Intestines: Happy Tummy actively supports your dog's digestive wellness with our blend of pre-and probiotics. These treats for dogs promote smoother digestion and boost intestinal functions. It's the natural solution to tummy woes, ensuring your furry friend feels light, comfortable, and ready for play.\r\nㅤ\r\n🐾 Better Nutrient Production: By introducing pre-and probiotics to your dog's diet, Happy Tummy by Dr. Shiba helps the growth of beneficial gut bacteria, creating an optimal environment for nutrient absorption. This means that your furry friend can enjoy a delectable dog treat and reap the maximum nutritional benefits from every bite.",
		},
		{
			id: 2,
			name: "PEDIGREE DentaStix for Puppy – Dental Treats for Puppy, 56g. Daily Puppy Treats for Healthy Gums",
			price: "₱71",
			images: ["/images/shop-products/02/01.png"],
			soldNum: 30125,
			selections: [{ name: "Flavour", varieties: ["Beef", "Duck", "Salmon", "Suprise Me!"] }],
			description:
				"Description Here\r\nLorem ipsum dolor sit amet consectetur, adipisicing elit. Neque quibusdam odio quaerat, aspernatur dolore enim culpa quae soluta tenetur rerum, ratione, alias beatae possimus cupiditate obcaecati? Necessitatibus ut a quam.",
		},
		{
			id: 3,
			name: "Dr. Shiba Happy Tummy Taster Pack - Beef 40g  Dog Treats Snack - Dog Food for Digestive Care",
			price: "₱99",
			images: ["/images/shop-products/03/01.png"],
			soldNum: 30125,
			selections: [{ name: "Flavour", varieties: ["Beef", "Duck", "Salmon", "Suprise Me!"] }],
			description:
				"Description Here\r\nLorem ipsum dolor sit amet consectetur, adipisicing elit. Neque quibusdam odio quaerat, aspernatur dolore enim culpa quae soluta tenetur rerum, ratione, alias beatae possimus cupiditate obcaecati? Necessitatibus ut a quam.",
		},
		{
			id: 4,
			name: "Mandaue Foam Dog Bed",
			price: "₱735",
			images: ["/images/shop-products/04/01.png"],
			soldNum: 30125,
			selections: [{ name: "Flavour", varieties: ["Beef", "Duck", "Salmon", "Suprise Me!"] }],
			description:
				"Description Here\r\nLorem ipsum dolor sit amet consectetur, adipisicing elit. Neque quibusdam odio quaerat, aspernatur dolore enim culpa quae soluta tenetur rerum, ratione, alias beatae possimus cupiditate obcaecati? Necessitatibus ut a quam.",
		},
		{
			id: 5,
			name: "BATTERY CAGE (3 DOOR/4 DOOR/5 DOOR) - Mr.Chuck",
			price: "₱990 - ₱1,290",
			images: ["/images/shop-products/05/01.png"],
			soldNum: 30125,
			selections: [{ name: "Flavour", varieties: ["Beef", "Duck", "Salmon", "Suprise Me!"] }],
			description:
				"Description Here\r\nLorem ipsum dolor sit amet consectetur, adipisicing elit. Neque quibusdam odio quaerat, aspernatur dolore enim culpa quae soluta tenetur rerum, ratione, alias beatae possimus cupiditate obcaecati? Necessitatibus ut a quam.",
		},
		{
			id: 6,
			name: "Rojeco 3.2L Cat Drinking Fountain Filters 304 Stainless Steel Pet Fountains Filter Replacement",
			price: "₱329 - ₱629",
			images: ["/images/shop-products/06/01.png"],
			soldNum: 30125,
			selections: [{ name: "Flavour", varieties: ["Beef", "Duck", "Salmon", "Suprise Me!"] }],
			description:
				"Description Here\r\nLorem ipsum dolor sit amet consectetur, adipisicing elit. Neque quibusdam odio quaerat, aspernatur dolore enim culpa quae soluta tenetur rerum, ratione, alias beatae possimus cupiditate obcaecati? Necessitatibus ut a quam.",
		},
		{
			id: 7,
			name: "Petcher Detick and Alprocide 1cc & 2cc with Free Syringe Anti Tick and Flea Spot on Treatment",
			price: "₱37 - ₱92",
			images: ["/images/shop-products/07/01.png"],
			soldNum: 30125,
			selections: [{ name: "Flavour", varieties: ["Beef", "Duck", "Salmon", "Suprise Me!"] }],
			description:
				"Description Here\r\nLorem ipsum dolor sit amet consectetur, adipisicing elit. Neque quibusdam odio quaerat, aspernatur dolore enim culpa quae soluta tenetur rerum, ratione, alias beatae possimus cupiditate obcaecati? Necessitatibus ut a quam.",
		},
		{
			id: 8,
			name: "Alonefire 9LED 395nm Aluminum Alloy Mini UV Flashlight Travel Cat Dog Urine Money Detector Torch For AAA Battery",
			price: "₱75 - ₱79",
			images: ["/images/shop-products/08/01.png"],
			soldNum: 30125,
			selections: [{ name: "Flavour", varieties: ["Beef", "Duck", "Salmon", "Suprise Me!"] }],
			description:
				"Description Here\r\nLorem ipsum dolor sit amet consectetur, adipisicing elit. Neque quibusdam odio quaerat, aspernatur dolore enim culpa quae soluta tenetur rerum, ratione, alias beatae possimus cupiditate obcaecati? Necessitatibus ut a quam.",
		},
		{
			id: 9,
			name: "Rojeco Cat Water Fountain Replaceable Activated Carbon Filters Filter For Pet Automatic Drinking",
			price: "₱179 - ₱529",
			images: ["/images/shop-products/09/01.png"],
			soldNum: 30125,
			selections: [{ name: "Flavour", varieties: ["Beef", "Duck", "Salmon", "Suprise Me!"] }],
			description:
				"Description Here\r\nLorem ipsum dolor sit amet consectetur, adipisicing elit. Neque quibusdam odio quaerat, aspernatur dolore enim culpa quae soluta tenetur rerum, ratione, alias beatae possimus cupiditate obcaecati? Necessitatibus ut a quam.",
		},
		{
			id: 10,
			name: "Alonefire 9LED 395nm Aluminum Alloy Mini UV Flashlight Travel Cat Dog Urine Money Detector Torch For AAA Battery",
			price: "₱859",
			images: ["/images/shop-products/10/01.png"],
			soldNum: 30125,
			selections: [{ name: "Flavour", varieties: ["Beef", "Duck", "Salmon", "Suprise Me!"] }],
			description:
				"Description Here\r\nLorem ipsum dolor sit amet consectetur, adipisicing elit. Neque quibusdam odio quaerat, aspernatur dolore enim culpa quae soluta tenetur rerum, ratione, alias beatae possimus cupiditate obcaecati? Necessitatibus ut a quam.",
		},
		{
			id: 11,
			name: "Alonefire 9LED 395nm Aluminum Alloy Mini UV Flashlight Travel Cat Dog Urine Money Detector Torch For AAA Battery",
			price: "₱859",
			images: ["/images/shop-products/11/01.png"],
			soldNum: 30125,
			selections: [{ name: "Flavour", varieties: ["Beef", "Duck", "Salmon", "Suprise Me!"] }],
			description:
				"Description Here\r\nLorem ipsum dolor sit amet consectetur, adipisicing elit. Neque quibusdam odio quaerat, aspernatur dolore enim culpa quae soluta tenetur rerum, ratione, alias beatae possimus cupiditate obcaecati? Necessitatibus ut a quam.",
		},
		{
			id: 12,
			name: "Alonefire 9LED 395nm Aluminum Alloy Mini UV Flashlight Travel Cat Dog Urine Money Detector Torch For AAA Battery",
			price: "₱859",
			images: ["/images/shop-products/12/01.png"],
			soldNum: 30125,
			selections: [{ name: "Flavour", varieties: ["Beef", "Duck", "Salmon", "Suprise Me!"] }],
			description:
				"Description Here\r\nLorem ipsum dolor sit amet consectetur, adipisicing elit. Neque quibusdam odio quaerat, aspernatur dolore enim culpa quae soluta tenetur rerum, ratione, alias beatae possimus cupiditate obcaecati? Necessitatibus ut a quam.",
		},
		{
			id: 13,
			name: "Alonefire 9LED 395nm Aluminum Alloy Mini UV Flashlight Travel Cat Dog Urine Money Detector Torch For AAA Battery",
			price: "₱859",
			images: ["/images/shop-products/13/01.png"],
			soldNum: 30125,
			selections: [{ name: "Flavour", varieties: ["Beef", "Duck", "Salmon", "Suprise Me!"] }],
			description:
				"Description Here\r\nLorem ipsum dolor sit amet consectetur, adipisicing elit. Neque quibusdam odio quaerat, aspernatur dolore enim culpa quae soluta tenetur rerum, ratione, alias beatae possimus cupiditate obcaecati? Necessitatibus ut a quam.",
		},
		{
			id: 14,
			name: "Alonefire 9LED 395nm Aluminum Alloy Mini UV Flashlight Travel Cat Dog Urine Money Detector Torch For AAA Battery",
			price: "₱859",
			images: ["/images/shop-products/14/01.png"],
			soldNum: 30125,
			selections: [{ name: "Flavour", varieties: ["Beef", "Duck", "Salmon", "Suprise Me!"] }],
			description:
				"Description Here\r\nLorem ipsum dolor sit amet consectetur, adipisicing elit. Neque quibusdam odio quaerat, aspernatur dolore enim culpa quae soluta tenetur rerum, ratione, alias beatae possimus cupiditate obcaecati? Necessitatibus ut a quam.",
		},
		{
			id: 15,
			name: "Alonefire 9LED 395nm Aluminum Alloy Mini UV Flashlight Travel Cat Dog Urine Money Detector Torch For AAA Battery",
			price: "₱859",
			images: ["/images/shop-products/15/01.png"],
			soldNum: 30125,
			selections: [{ name: "Flavour", varieties: ["Beef", "Duck", "Salmon", "Suprise Me!"] }],
			description:
				"Description Here\r\nLorem ipsum dolor sit amet consectetur, adipisicing elit. Neque quibusdam odio quaerat, aspernatur dolore enim culpa quae soluta tenetur rerum, ratione, alias beatae possimus cupiditate obcaecati? Necessitatibus ut a quam.",
		},
	];
	return useState("dummy-products", () => dummyProducts);
};
