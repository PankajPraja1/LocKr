import { useState, useEffect } from "react";
import { PlusIcon, EyeIcon, EyeOffIcon, CopyIcon, PencilIcon, Trash2Icon } from "@animateicons/react/lucide";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({ site: "", username: "", password: "" });

    const [passwordArray, setPasswordArray] = useState([])

    // Get passwords from the backend server
    const getPasswords = async () => {
        try {
            const req = await fetch("http://localhost:3000/");
            if (!req.ok) {
                throw new Error("Failed to load passwords");
            }
            const storedPasswords = await req.json();
            console.log("Stored Passwords:", storedPasswords);
            setPasswordArray(storedPasswords);
        } catch (error) {
            console.error("Unable to load passwords:", error);
            toast.error("Unable to connect to the password server. Start the backend and try again.");
        }

    }

    useEffect(() => {
        getPasswords();
    }, [])

    // Save password to the backend server
    const savePassword = async () => {
        if (form.site === "" || form.username === "" || form.password === "") {
            toast('Please fill all the fields!');
            return;
        }

        const password = { ...form, id: form.id || uuidv4() };

        const isEditing = Boolean(form.id);

        try {
            const req = await fetch("http://localhost:3000/", {
                method: isEditing ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(password)
            });

            if (!req.ok) {
                throw new Error(isEditing ? "Failed to update password" : "Failed to save password");
            }

            if (isEditing) {
                setPasswordArray(passwordArray.map(item => item.id === password.id ? password : item));
                toast.success("Password updated!");
            } else {
                setPasswordArray([...passwordArray, password]);
                toast.success("Password saved!");
            }

            setForm({ site: "", username: "", password: "" });
        } catch (error) {
            console.error("Unable to save password:", error);
            toast.error("Unable to save password. Start the backend and try again.");
        }
    }

    // Delete password
    const deletePassword = async (id) => {
        console.log("Deleting password with id:", id);
        let c = confirm("Are you sure you want to delete this password?");
        if (c) {

            try {
                const req = await fetch("http://localhost:3000/", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ id })
                });

                if (!req.ok) {
                    throw new Error("Failed to delete password");
                }

                setPasswordArray(passwordArray.filter(item => item.id !== id));
                toast('Password deleted!');
            } catch (error) {
                console.error("Unable to delete password:", error);
                toast.error("Unable to delete password. Start the backend and try again.");
            }
        }
    }

    // Edit password
    const editPassword = (id) => {
        console.log("Editing password with id:", id);
        const passwordToEdit = passwordArray.find(item => item.id === id);
        if (!passwordToEdit) {
            toast.error("Password not found!"); return;
        }
        setForm(passwordToEdit);
        window.scrollTo({ top: 0, behavior: "smooth" });
        // setPasswordArray(passwordArray.filter(item => item.id !== id));
        // toast('Password edited!');
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const copyText = async (text) => {
        await navigator.clipboard.writeText(text);
        toast.success('Copy to clipboard!');
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

            <div className="p-2 mx-auto md:px-24 md:py-16 md:max-w-6xl">
                <h1 className='text-4xl font-bold text-center'>
                    <span className="text-green-400">&lt;</span>
                    LocK
                    <span className="text-green-400">r/&gt;</span>
                </h1>

                <p className='text-green-700 text-lg text-center'>Your own Password Manager</p>

                <div className="flex flex-col gap-8 p-4 items-center">
                    <input name="site" id="site" value={form.site} onChange={handleChange} placeholder='Enter website URL' type="text" className="border border-green-500 w-full px-4 py-2 rounded-full" />

                    <div className="flex flex-col md:flex-row w-full gap-6 justify-between">
                        <input name="username" id="username" value={form.username} onChange={handleChange} placeholder='Enter Username' type="text" className="border border-green-500 w-full px-4 py-2 rounded-full" />

                        <div className="relative flex w-full items-center">
                            <input name="password" id="password" value={form.password} onChange={handleChange} placeholder='Enter Password' type={showPassword ? "text" : "password"} className="border border-green-500 w-full px-4 py-2 rounded-full" />

                            <span className='absolute right-2 top-2 cursor-pointer'>
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
                                    {showPassword ? (
                                        <EyeOffIcon
                                            size={24}
                                            duration={1}
                                            color="black"
                                        />
                                    ) : (
                                        <EyeIcon
                                            size={24}
                                            duration={1}
                                            color="black"
                                        />
                                    )}
                                </button>
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='bg-green-400 rounded-full flex gap-3 items-center justify-center px-4 py-2 cursor-pointer hover:bg-green-500 w-fit border'>
                        <PlusIcon
                            size={24}
                            duration={1}
                            color="black"
                        />
                        Save
                    </button>
                </div>


                <div className="passwords overflow-x-auto  pb-10">
                    <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords to show</div>}
                    {passwordArray.length != 0 &&

                        <table className="table-auto w-full rounded-lg overflow-hidden border border-green-600">
                            <thead className="bg-green-600 text-white">
                                <tr>
                                    <th className="py-2">Site</th>
                                    <th className="py-2">Username</th>
                                    <th className="py-2">Password</th>
                                    <th className="py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-green-100">
                                {passwordArray.map((item, index) => {
                                    return (
                                        <tr key={index} className="hover:bg-green-200">
                                            <td className="py-1 border border-white border-2 text-center ">
                                                <div className="flex gap-2 justify-around items-center">
                                                    <a href={item.site} target="_blank" className="hover:underline">
                                                        {item.site}
                                                    </a>
                                                    <div className="cursor-pointer" onClick={() => { copyText(item.site) }}>
                                                        <CopyIcon
                                                            size={18}
                                                            duration={1}
                                                            color="black"
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-1 border border-white border-2 text-center">
                                                <div className="flex gap-2 justify-around items-center">
                                                    {item.username}
                                                    <div className="cursor-pointer" onClick={() => { copyText(item.username) }}>
                                                        <CopyIcon
                                                            size={18}
                                                            duration={1}
                                                            color="black"
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-1 border border-white border-2 text-center">
                                                <div className="flex gap-2 justify-around items-center">
                                                    {"*".repeat(item.password.length)}
                                                    <div className="cursor-pointer" onClick={() => { copyText(item.password) }}>
                                                        <CopyIcon
                                                            size={18}
                                                            duration={1}
                                                            color="black"
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-1 border border-white border-2 text-center">
                                                <div className="flex gap-2 justify-center items-center">
                                                    <span className="cursor-pointer" onClick={() => { editPassword(item.id) }}>
                                                        <PencilIcon
                                                            size={18}
                                                            duration={1}
                                                            color="black"
                                                        />
                                                    </span>
                                                    <span className="cursor-pointer" onClick={() => { deletePassword(item.id) }}>
                                                        <Trash2Icon
                                                            size={18}
                                                            duration={1}
                                                            color="#000000"
                                                        />
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>)
                                })}

                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager
