import Container from "../../components/ui/Container";
import PageHeading from "../../components/ui/PageHeading";

export default function About () {
    return (
        <Container>
            <PageHeading
                title="About us"
                subtitle="Learn more about us."
            />
            <section className="my-4 space-y-2">
                <div className="grid grid-cols-3 gap-2 space-y-2">
                    <div className="col-span-2 space-y-8">
                    <p className="col-span-2">
                    At <span className="font-bold">ManiShop</span>, we understand that shopping should be hassle-free and reliable. That's why we have adopted a unique approach to online retail. We are not just a payment gateway; instead, we take care of the entire order process, from selecting the products to delivering them to your doorstep. With us, you can shop with confidence, knowing that you will only pay when the product is safely in your hands.
                    </p>
                    <p className="col-span-2">
                    We take great pride in curating a diverse range of categories, ensuring that there's something for everyone. Whether you're looking for trendy clothing to update your wardrobe, the latest gadgets to enhance your tech collection, or other exciting products, we have you covered. Our team works tirelessly to source high-quality items that meet our stringent standards, ensuring that you receive only the best.
                    </p>
                    </div>
                    <img className="w-full" src="./MS.svg" alt="" />
                    <p className="col-span-3">
                    Customer satisfaction is at the heart of our business. We strive to create a seamless shopping experience by providing a user-friendly website with intuitive navigation. Our product descriptions and images are detailed and accurate, allowing you to make informed decisions. Should you ever need assistance, our dedicated customer support team is here to help. We value your feedback and are committed to continually improving our services based on your suggestions.
                    </p>
                    <p className="col-span-3">
                    We understand that security and privacy are of paramount importance when shopping online. Rest assured that we employ robust security measures to protect your personal information. Our payment system is secure, and your data is handled with the utmost care.
                    </p>
                    <p className="col-span-3">
                    We take pride in our prompt and reliable delivery service. Once you've placed your order, our logistics team ensures that your package is carefully prepared for shipment. We work with trusted shipping partners to ensure timely delivery to your preferred location. You can track your order every step of the way, giving you peace of mind.
                    </p>
                    <p className="col-span-3">
                    As a Moroccan company, we are deeply committed to supporting the local economy and fostering positive relationships with our customers. We believe in the power of e-commerce to bridge gaps and connect people. By shopping with us, you are not only getting great products, but you are also contributing to the growth of local businesses and the development of our community.
                    </p>
                    <p className="col-span-3">
                    Thank you for choosing <span className="font-bold">Manishop</span> as your preferred online shopping destination. We look forward to serving you and exceeding your expectations. Happy shopping!
                    </p>
                </div>
            </section>
        </Container>
    )
}