import { useEffect, useState } from "react";
import { UserDataRes, UsersParams } from "../types/users.types";
import { userService } from "../api/Users.service";

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
