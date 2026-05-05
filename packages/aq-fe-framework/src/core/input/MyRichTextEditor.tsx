import { Input, InputWrapperProps, ScrollArea, ScrollAreaAutosizeProps } from '@mantine/core';
import { Link, RichTextEditor as MantineRichTextEditor, RichTextEditor, RichTextEditorContentProps, RichTextEditorProps, RichTextEditorToolbarProps } from '@mantine/tiptap';
import Highlight from '@tiptap/extension-highlight';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEditor, UseEditorOptions } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ReactNode, useEffect } from 'react';

interface MyRichTextEditorProps extends Omit<InputWrapperProps, "value" | "onChange" | "onBlur"> {
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: (value: string) => void
    richTextEditorProps?: Omit<RichTextEditorProps, "children" | "editor">
    richTextEditorToolBarProps?: RichTextEditorToolbarProps
    richTextEditorContentProps?: RichTextEditorContentProps
    readOnly?: boolean
    /**
     * @deprecated 
     * Vui lòng dùng `Xài trực tiếp props cấp 1 của MyRichTextEditor luôn giờ nó extend từ InputWrapperProps rồi` từ `core` thay thế.
     */
    inputWrapperProps?: InputWrapperProps,
    scrollAreaAutosizeProps?: ScrollAreaAutosizeProps,
    extraControlsGroup?: ReactNode,
    useEditorProps?: UseEditorOptions
}

function isEditorContentEmpty(html: string): boolean {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent?.trim() === '' && !tempDiv.querySelector('img, video, iframe, audio');
}
export function MyRichTextEditor({
    value,
    onChange,
    onBlur,
    richTextEditorProps,
    richTextEditorToolBarProps,
    richTextEditorContentProps,
    inputWrapperProps,
    scrollAreaAutosizeProps,
    extraControlsGroup,
    useEditorProps,
    readOnly,
    ...rest
}: MyRichTextEditorProps) {
    const editor = useEditor({
        editable: !readOnly,
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            onChange?.(isEditorContentEmpty(html) ? '' : html);
        },
        onBlur: ({ editor }) => {
            const html = editor.getHTML();
            onBlur?.(isEditorContentEmpty(html) ? '' : html);
        },
        ...useEditorProps
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value || "", false);
        }
    }, [value, editor]);
    return (
        <Input.Wrapper  {...inputWrapperProps} {...rest}>
            <MantineRichTextEditor editor={editor} {...richTextEditorProps}
                className={`border rounded-md transition-colors duration-150 ${rest.error ? 'border-red-500' : ''}`}
            >
                <DisabledControl disabled={!editor?.isEditable}>
                    <MantineRichTextEditor.Toolbar   {...richTextEditorToolBarProps}>

                        <MantineRichTextEditor.ControlsGroup>
                            <MantineRichTextEditor.Bold />
                            <MantineRichTextEditor.Italic />
                            <MantineRichTextEditor.Underline />
                            <MantineRichTextEditor.Strikethrough />
                            <MantineRichTextEditor.ClearFormatting />
                            <MantineRichTextEditor.Highlight />
                            <MantineRichTextEditor.Code />
                        </MantineRichTextEditor.ControlsGroup>


                        <MantineRichTextEditor.ControlsGroup>
                            <MantineRichTextEditor.H1 />
                            <MantineRichTextEditor.H2 />
                            <MantineRichTextEditor.H3 />
                            <MantineRichTextEditor.H4 />
                        </MantineRichTextEditor.ControlsGroup>

                        <MantineRichTextEditor.ControlsGroup>
                            <MantineRichTextEditor.Blockquote />
                            <MantineRichTextEditor.Hr />
                            <MantineRichTextEditor.BulletList />
                            <MantineRichTextEditor.OrderedList />
                            <MantineRichTextEditor.Subscript />
                            <MantineRichTextEditor.Superscript />
                        </MantineRichTextEditor.ControlsGroup>

                        <MantineRichTextEditor.ControlsGroup>
                            <MantineRichTextEditor.Link />
                            <MantineRichTextEditor.Unlink />
                        </MantineRichTextEditor.ControlsGroup>

                        <MantineRichTextEditor.ControlsGroup>
                            <MantineRichTextEditor.AlignLeft />
                            <MantineRichTextEditor.AlignCenter />
                            <MantineRichTextEditor.AlignJustify />
                            <MantineRichTextEditor.AlignRight />
                        </MantineRichTextEditor.ControlsGroup>
                        {extraControlsGroup}
                    </MantineRichTextEditor.Toolbar>
                </DisabledControl>
                <ScrollArea.Autosize
                    onMouseDown={() => {
                        editor?.commands.focus();
                    }}
                    className={`min-h-[130px] ${editor?.isEditable ? '' : 'bg-gray-100 text-gray-500 pointer-events-none cursor-default'}`}
                    mah={"130"}
                    style={{
                        cursor: editor?.isEditable ? "text" : "default", // đổi cursor
                    }}
                    {...scrollAreaAutosizeProps}
                >
                    <RichTextEditor.Content mih={"130"} {...richTextEditorContentProps} />
                </ScrollArea.Autosize>
            </MantineRichTextEditor>
        </Input.Wrapper>
    );
}

function DisabledControl({ children, disabled }: { children: ReactNode, disabled: boolean }) {
    return (
        <div style={{ pointerEvents: disabled ? "none" : "auto", opacity: disabled ? 0.5 : 1 }}>
            {children}
        </div>
    );
}