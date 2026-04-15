"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { getMe, type User } from "./api";

/**
 * Tiny current-user hook. Refetches /auth/me whenever the route changes so
 * the header reflects login state after navigation — no global store needed.
 */
export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const refresh = useCallback(async () => {
    try {
      const me = await getMe();
      setUser(me);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh, pathname]);

  return { user, loading, refresh };
}
