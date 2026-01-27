import apiClient from "@/app/lib/api-client";

/*
  Assuming Backend Endpoint: 
  POST /upload/project-asset
  Form-Data: file, project_slug, file_type
  Response: { url: string, file_path: string, message: string }
*/

export interface UploadResponse {
    url: string;
    file_path: string;
    message: string;
}

export const UploadService = {
    uploadAsset: async (file: File, projectSlug: string, fileType: "image" | "video") => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("project_slug", projectSlug);
        formData.append("file_type", fileType);

        const response = await apiClient.post<UploadResponse>("/upload/project-asset", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },

    deleteAsset: async (fileUrl: string) => {
        // Backend expects Form data with file_url? Or Query param?
        // Checking backend analysis: Input: file_url (Form)
        const formData = new FormData();
        formData.append("file_url", fileUrl);

        // Axios delete doesn't support body easily like post, so we use request config
        const response = await apiClient.delete("/upload/project-asset", {
            data: formData,
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
    }
};
