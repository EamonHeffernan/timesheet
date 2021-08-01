import { request } from "../pages/_app";

export default function LogOut() {
	request("/api/users/signOut", "POST");
}
