"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectForm, ProjectData } from "@/app/admin/components/ProjectForm";
import { ProjectService } from "@/app/services/project.service";

export default function NewProjectPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (
        data: ProjectData,
        files: { coverFile: File | null; pendingAssets: Array<{ file: File; type: "image" | "video" }> }
    ) => {
        try {
            setIsSubmitting(true);
            setError(null);

            // 1. Upload cover image if present
            if (files.coverFile) {
                console.log("Uploading cover image...");
                const coverUrl = await ProjectService.uploadAsset(
                    files.coverFile,
                    data.slug,
                    "cover"
                );
                data.cover_image_url = coverUrl;
                console.log("Cover uploaded:", coverUrl);
            }

            // 2. Upload pending assets in parallel
            if (files.pendingAssets.length > 0) {
                console.log(`Uploading ${files.pendingAssets.length} assets...`);
                const uploadedUrls = await Promise.all(
                    files.pendingAssets.map(({ file, type }) =>
                        ProjectService.uploadAsset(file, data.slug, type)
                    )
                );

                // Replace blob URLs with real URLs
                const blobUrls = (data.assets || [])
                    .filter(asset => asset.url.startsWith('blob:'))
                    .map(asset => asset.url);

                data.assets = (data.assets || []).map((asset) => {
                    if (blobUrls.includes(asset.url)) {
                        const uploadIndex = blobUrls.indexOf(asset.url);
                        return { ...asset, url: uploadedUrls[uploadIndex] };
                    }
                    return asset;
                });

                console.log("Assets uploaded:", uploadedUrls);
            }

            // 3. Create project with final URLs
            console.log("Creating project...");
            await ProjectService.create(data);

            // Redirect to list
            router.push("/admin/projects");
        } catch (err) {
            console.error("Failed to create project:", err);
            setError("Erreur lors de la création du projet.");
            throw err;
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 p-6">
            {error && (
                <div className="max-w-5xl mx-auto mb-6 bg-red-50 border border-red-200 rounded-2xl p-4">
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}
            <ProjectForm
                isEditing={false}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            />
        </div>
    );
}
