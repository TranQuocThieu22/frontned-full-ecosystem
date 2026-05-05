import { useRef } from "react";
import {
  Group,
  ActionIcon,
  Paper,
  Image,
  Text,
} from "@mantine/core";
import { IconPhoto, IconX } from "@tabler/icons-react";
import { MyTextInput } from "aq-fe-framework/components";

interface ICustomImage {
  file: File | null;
  preview: string | null;
  name: string;
}

interface ImageUploaderProps {
  customImage: ICustomImage;
  setCustomImage: (image: ICustomImage) => void;
}

export default function ImageUploader({ customImage, setCustomImage }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Vui lòng chọn file hình ảnh!");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("File quá lớn! Vui lòng chọn file nhỏ hơn 5MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomImage({
          file: file,
          preview: e.target?.result as string,
          name: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearImage = () => {
    setCustomImage({ file: null, preview: null, name: "" });
  };

  const triggerInput = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      handleImageUpload({ target } as React.ChangeEvent<HTMLInputElement>);
    };
    input.click();
  };

  return (
    <>
      <Group gap="xs" align="center">
        <MyTextInput
          placeholder="Chưa chọn ảnh nào"
          value={customImage.name}
          readOnly
          style={{ flex: 1 }}
          size="sm"
        />
        {customImage.file && (
          <ActionIcon
            variant="light"
            color="red"
            onClick={handleClearImage}
            size="sm"
          >
            <IconX size={16} />
          </ActionIcon>
        )}
        <ActionIcon
          variant="light"
          color="blue"
          onClick={triggerInput}
          size="sm"
        >
          <IconPhoto size={16} />
        </ActionIcon>
      </Group>

      {customImage.preview && (
        <Paper
          p="xs"
          mt="sm"
          style={{
            border: "1px solid #e9ecef",
            borderRadius: "8px",
          }}
        >
          <Image
            src={customImage.preview}
            alt="Preview"
            height={80}
            fit="cover"
            radius="sm"
          />
          <Text size="xs" c="dimmed" mt="xs" ta="center" truncate>
            {customImage.name}
          </Text>
        </Paper>
      )}
    </>
  );
}
