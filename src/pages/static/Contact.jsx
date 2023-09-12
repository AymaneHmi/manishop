

import Container from "../../components/ui/Container";
import Input from "../../components/ui/Input";
import PageHeading from "../../components/ui/PageHeading";

export default function Contact () {
    return (
        <Container>
            <PageHeading
                title="Contact Us"
                subtitle="Be clooser to us."
            />
            <section className="my-4 font-bold grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-2 flex flex-col gap-8">
                    <p className="font-light">We value your feedback, questions, and concerns. Please fill out the form below, and our dedicated customer support team will get back to you as soon as possible.</p>
                    <form className="border rounded-lg shadow-xl flex flex-col items-center text-left px-4 py-2 space-y-2">
                        <div className="grid grid-cols-2 w-full gap-4">
                            <div className="w-full flex flex-col space-y-2">
                                <label htmlFor="">Name</label>
                                <Input
                                    placeholder={'John Doe'}
                                    type={'text'}
                                />
                            </div>
                            <div className="w-full flex flex-col space-y-2">
                                <label htmlFor="">Number</label>
                                <Input
                                    placeholder={'+000 000000000'}
                                    type={'Number'}
                                />
                            </div>
                        </div>
                        <div className="w-full flex flex-col space-y-2">
                            <label htmlFor="">Email</label>
                            <Input
                                placeholder={'johndoe@gmail.com'}
                                type={'email'}
                            />
                        </div>
                        <div className="w-full flex flex-col space-y-2">
                            <label htmlFor="">Subject</label>
                            {/* <input placeholder="Your message subject" className="border-2 border-primary px-4 py-2 rounded dark:bg-slate-700" type="text" /> */}
                            <Input
                                placeholder={"I didn't recieve my package."}
                                type={'text'}
                            />
                        </div>
                        <div className="w-full flex flex-col space-y-2">
                            <label htmlFor="">Message</label>
                            {/* <textarea placeholder="Provide details of your subject" className="border-2 border-primary px-4 py-2 rounded dark:bg-slate-700" cols="30" rows="10"></textarea> */}
                            <Input
                                placeholder={'Provide details of your subject.'}
                                type={'text'}
                                rows={'10'}
                                cols={'30'}
                                textarea
                            />
                        </div>
                        <input className="bg-primary text-white px-4 py-2 w-full rounded cursor-pointer hover:bg-secondary transition duration-150" type="button" value="Send Message" />
                    </form>
                </div>
                <div className="w-full flex flex-col gap-8 font-light">
                    <p className="col-span-3 md:col-span-1">
                    Alternatively, you can also reach us directly through the following contact information:
                    </p>
                    <p>
                    <span className="font-bold">Email: </span>
                    For general inquiries and assistance, please email us at <a className="text-blue-500" href="mailto:????????@????.???">????????@????.???</a> We strive to respond to all emails within 24 hours during business days.
                    </p>
                    <p>
                    <span className="font-bold">Phone: </span>
                    You can reach us by phone during our customer support hours. Please call <a className="text-blue-500" href="tel:+000 000000000">+000 000000000</a> to speak with one of our representatives.
                    </p>
                    <p className="col-span-3">
                    Thank you for reaching out to us. We appreciate your feedback and look forward to assisting you.
                    </p>
                </div>
            </section>
        </Container>
    )
}