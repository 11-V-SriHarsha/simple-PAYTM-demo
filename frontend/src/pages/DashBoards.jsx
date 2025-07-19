import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import Users from "../components/Users";
import { useEffect, useState } from "react"; // Re-added useState
import axios from 'axios'; // Ensure axios is imported if used directly
// Removed: import { useRecoilValue, useSetRecoilState } from 'recoil';
// Removed: import { balanceAtom } from '../atoms';

function Dashboard() {
    const [balance, setBalance] = useState(0); // Reverted to local state

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                setBalance(response.data.balance); // Set fetched balance in local state
            } catch (error) {
                console.error("Error fetching balance:", error);
                // Optionally, show an error message to the user
            }
        };
        fetchBalance();
    }, []); // Reverted to empty dependency array

    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={balance.toFixed(2)} />
            <Users />
        </div>
    </div>
}

export default Dashboard;