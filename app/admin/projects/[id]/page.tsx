"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ProjectForm, ProjectData } from "@/app/admin/components/ProjectForm";
import { ProjectService, adaptToFrontend } from "@/app/services/project.service";

export default function EditProjectPage() {
    const router = useRouter();
    const params = useParams();
    const projectId = params.id as string;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [initialData, setInitialData] = useState<ProjectData | undefined>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        loadProject();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectId]);

    const loadProject = async () => {
        try {
            setLoading(true);
            setError(null);
            const project = await ProjectService.getById(projectId);
            const adapted = adaptToFrontend(project);
            setInitialData(adapted);
        } catch (err) {
            console.error("Failed to load project:", err);
            setError("Impossible de charger le projet.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (
        data: ProjectData,
        files: { coverFile: File | null; pendingAssets: Array<{ file: File; type: "image" | "video" }> }
    ) => {
        try {
            setIsSubmitting(true);
            setError(null);

            // 1. Upload cover image if changed
            if (files.coverFile) {
                console.log("Uploading new cover image...");
                const coverUrl = await ProjectService.uploadAsset(
                    files.coverFile,
                    data.slug,
                    "cover"
                );
                data.cover_image_url = coverUrl;
                console.log("Cover uploaded:", coverUrl);
            }

            // 2. Upload new assets
            if (files.pendingAssets.length > 0) {
                console.log(`Uploading ${files.pendingAssets.length} new assets...`);
                const uploadedUrls = await Promise.all(
                    files.pendingAssets.map(({ file, type }) =>
                        ProjectService.uploadAsset(file, data.slug, type)
                    )
                );

                // Replace blob URLs with real URLs
                const blobUrls = (data.assets || [])
                    .filter(asset => asset.url.startsWith('blob:'))
                    .map(asset => asset.url);

                data.assets = (data.assets || []).map((asset, index) => {
                    if (blobUrls.includes(asset.url)) {
                        const uploadIndex = blobUrls.indexOf(asset.url);
                        return { ...asset, url: uploadedUrls[uploadIndex] };
                    }
                    return asset;
                });

                console.log("Assets uploaded:", uploadedUrls);
            }

            // 3. Update project
            console.log("Updating project...");
            await ProjectService.update(projectId, data);

            // Redirect to list
            router.push("/admin/projects");
        } catch (err) {
            console.error("Failed to update project:", err);
            setError("Erreur lors de la mise à jour du projet.");
            throw err;
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50/50 p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-500 font-medium">Chargement du projet...</p>
                </div>
            </div>
        );
    }

    if (error && !initialData) {
        return (
            <div className="min-h-screen bg-slate-50/50 p-6 flex items-center justify-center">
                <div className="max-w-md bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                    <h3 className="text-lg font-bold text-red-900 mb-2">Erreur</h3>
                    <p className="text-sm text-red-700 mb-4">{error}</p>
                    <button
                        onClick={loadProject}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                    >
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/50 p-6">
            {error && (
                <div className="max-w-5xl mx-auto mb-6 bg-red-50 border border-red-200 rounded-2xl p-4">
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}
            <ProjectForm 
                initialData={initialData}
                isEditing={true}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            />
        </div>
    );
}
