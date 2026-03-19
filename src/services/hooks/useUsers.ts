import { useEffect, useState } from "react";
import { userService } from "../api/Users.service";
import { UserDataRes, UsersParams } from "../types/Users.types";


export function useUsers() {
  const [query, setQuery] = useState<UsersParams>({});
  const [data, setData] = useState<UserDataRes | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    userService
      .getUsers(query)
      .then((res) => {
        setData(res);
      })
      .finally(() => setLoading(false));
  }, [query]);

  return { data, setQuery, loading };
}
