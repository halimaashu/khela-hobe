"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { PencilToSquare, TrashBin } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";

const FALLBACK = "/project_aihub.png"; // replace with your own placeholder in /public

// Plain <img> so any host (and base64 thumbnails) work, with a fallback
export const SafeImg = ({ src, alt, className }) => {
  const [failed, setFailed] = useState(false);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={failed || !src ? FALLBACK : src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
};

export const OwnerActions = ({ id }) => {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const { data } = await authClient.token();
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facilities/${id}`, {
        method: "DELETE",
        headers: data?.token ? { authorization: `Bearer ${data.token}` } : {},
      });
      if (!res.ok) throw new Error("Could not delete this facility.");
      toast.success("Facility deleted");
      router.push("/manage-facilities");
      router.refresh();
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
      setDeleting(false);
      setConfirming(false);
    }
  };

  if (confirming) {
    return (
      <div className="flex items-center gap-2" role="alertdialog" aria-label="Confirm delete">
        <span className="text-sm font-semibold hidden sm:inline" style={{ color: "var(--k-text)" }}>
          Delete this facility?
        </span>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="px-4 py-2 rounded-xl text-sm font-bold text-white disabled:opacity-60"
          style={{ background: "var(--k-brand)" }}
        >
          {deleting ? "Deleting…" : "Yes, delete"}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="px-4 py-2 rounded-xl border text-sm font-semibold"
          style={{ borderColor: "var(--k-border)", color: "var(--k-text)" }}
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/edit-facility/${id}`}
        className="px-3.5 py-2 rounded-xl border text-sm font-semibold inline-flex items-center gap-1.5 transition-colors hover:bg-[var(--k-surface-2)]"
        style={{ borderColor: "var(--k-border)", color: "var(--k-text)", background: "var(--k-surface)" }}
      >
        <PencilToSquare /> <span className="hidden sm:inline">Edit</span>
      </Link>
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="px-3.5 py-2 rounded-xl border text-sm font-semibold inline-flex items-center gap-1.5 transition-colors hover:bg-[var(--k-brand)] hover:text-white hover:border-[var(--k-brand)]"
        style={{ borderColor: "var(--k-border)", color: "var(--k-brand)", background: "var(--k-surface)" }}
      >
        <TrashBin /> <span className="hidden sm:inline">Delete</span>
      </button>
    </div>
  );
};