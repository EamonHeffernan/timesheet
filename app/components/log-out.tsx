/*
 * @Script: log-out.tsx
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-26 14:24:40
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 14:25:13
 * @Description: Function to remove cookies and log out.
 */
import { request } from "../pages/_app";

export default function LogOut() {
	request("/api/users/signOut", "POST");
}
