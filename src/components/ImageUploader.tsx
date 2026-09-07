import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Camera, FileImage, ImagePlus, Trash2, UploadCloud } from 'lucide-react';

type UploadMeta = {
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
};

type ImageUploaderProps = {
  language?: 'en' | 'ar';
  value?: string | null;
  onChange: (file: File | null, preview: string | null, meta: UploadMeta | null) => void;
};

const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const maxSizeBytes = 10 * 1024 * 1024;

function ImageUploader({ language = 'en', value = null, onChange }: ImageUploaderProps) {
  const isArabic = language === 'ar';
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(value || null);
  const [meta, setMeta] = useState<UploadMeta | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPreview(value || null);
  }, [value]);

  const clearSelection = () => {
    setPreview(null);
    setMeta(null);
    setError(null);
    onChange(null, null, null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const readFile = (file: File) => {
    const isValidType = validTypes.includes(file.type) || /\.(jpe?g|png|webp)$/i.test(file.name);
    if (!isValidType) {
      const message = isArabic
        ? 'نوع الصورة غير مدعوم. استخدم JPG، JPEG، PNG أو WEBP.'
        : 'Unsupported image type. Use JPG, JPEG, PNG, or WEBP.';
      setError(message);
      return;
    }

    if (file.size > maxSizeBytes) {
      const message = isArabic
        ? 'الصورة كبيرة جدًا. الحد الأقصى 10MB.'
        : 'The image is too large. Maximum size is 10MB.';
      setError(message);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : null;
      const nextMeta = {
        name: file.name,
        type: file.type || 'image/*',
        size: file.size,
        uploadedAt: new Date().toISOString(),
      };
      setPreview(result);
      setMeta(nextMeta);
      setError(null);
      onChange(file, result, nextMeta);
    };
    reader.onerror = () => {
      const message = isArabic ? 'فشل رفع الصورة. حاول مرة أخرى.' : 'Image upload failed. Please try again.';
      setError(message);
    };
    reader.readAsDataURL(file);
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    readFile(file);
    event.target.value = '';
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => cameraInputRef.current?.click()}
          className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center transition hover:border-blue-300 hover:bg-blue-50"
        >
          <Camera className="mx-auto mb-2 text-blue-600" size={28} />
          <span className="font-semibold text-slate-700">
            {isArabic ? 'التقاط صورة' : 'Take Photo'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center transition hover:border-blue-300 hover:bg-blue-50"
        >
          <UploadCloud className="mx-auto mb-2 text-blue-600" size={28} />
          <span className="font-semibold text-slate-700">
            {isArabic ? 'اختيار صورة' : 'Upload Image'}
          </span>
        </button>
      </div>

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleInput}
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        className="hidden"
        onChange={handleInput}
      />

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {preview ? (
        <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-slate-100">
          <img src={preview} alt={isArabic ? 'صورة البلاغ' : 'Report image'} className="h-72 w-full object-cover" />
          <div className="space-y-3 p-4">
            <div className="flex flex-wrap gap-2 text-xs text-slate-600">
              <span className="rounded-full bg-white px-2 py-1">{meta?.name || 'image'}</span>
              <span className="rounded-full bg-white px-2 py-1">{meta?.type || 'image/*'}</span>
              <span className="rounded-full bg-white px-2 py-1">
                {meta ? `${(meta.size / (1024 * 1024)).toFixed(2)} MB` : '0 MB'}
              </span>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700"
              >
                <ImagePlus size={16} />
                {isArabic ? 'استبدال الصورة' : 'Replace Image'}
              </button>
              <button
                type="button"
                onClick={clearSelection}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-700"
              >
                <Trash2 size={16} />
                {isArabic ? 'إزالة الصورة' : 'Remove'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-72 items-center justify-center rounded-[22px] border border-dashed border-slate-300 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),transparent_58%)] text-slate-500">
          <div className="text-center">
            <FileImage className="mx-auto mb-3 text-slate-400" size={42} />
            <p className="font-medium">{isArabic ? 'لم يتم رفع صورة بعد' : 'No image uploaded yet'}</p>
          </div>
        </div>
      )}

      <p className="text-xs leading-6 text-slate-500">
        {isArabic
          ? 'تأكد من عدم تضمين معلومات شخصية حساسة في الصور التي ترفعها.'
          : 'Avoid including sensitive personal information in uploaded images.'}
      </p>
    </div>
  );
}

export default ImageUploader;
