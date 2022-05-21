import { Editor } from "@tinymce/tinymce-react";
import classNames from "classnames";
import { useRouter } from "next/router";
import { default as React, useState, useRef, useMemo, useEffect } from "react";
import { Editor as TinyMCEEditor } from 'tinymce';

interface EditorProps {
  initialData?: string;
  onChange?: (text: string) => void;
  /**
   * When this prop is changed, its value is appended to the editor's content
   */
  appendData?: string;
  placeholder?: string;
  readOnly?: boolean;
  /**
   * When this prop is changed, the editor is scrolled to the first H1 or H2 matching its value
   */
  scrollTo?: string;
  className?: string;
}

export const EDITOR_ID = "editor-element";

export default function EditorComponent(props: EditorProps) {
  const value = useMemo(() => getInitialData(), []);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const editorRef = useRef<TinyMCEEditor | null>(null);
  /**
   * Get the initial data for the editor
   * Occassionally the parent component wants us to append data and will force a re-render in that scenario
   * @returns
   */
  function getInitialData() {
    let out: string = props.initialData ?? props.placeholder ?? '';
    if (props.appendData?.length) {
      out = out.concat(props.appendData);
    }
    return out;
  }

  /**
   * When the user selects a suggested section, append it to the content
   */
  useEffect(() => {
    if (!props.appendData) return;
    let content = editorRef.current?.getContent() ?? '';
    content += props.appendData
    editorRef.current?.setContent(content);
  }, [props.appendData])

  useEffect(() => {
    let elements = editorRef.current?.getBody().querySelectorAll('h1,h2').values();
    if (!elements) return;
    Array.from(elements).every((element) => {
      if (element.textContent == props.scrollTo) {
        element.scrollIntoView({ behavior: 'smooth' });
        return false;
      }
      return true;
    })
  }, [props.scrollTo])

  /**
   * Save the contents of the editor
   */
  function save() {
    if (!props.readOnly) {
      props.onChange?.(editorRef.current?.getContent() ?? '');

      //Let the editor know we saved
      editorRef.current?.save()
    }
  }

  /**
   * For when the user manually hits the save button
   */
  function manualSave() {
    save();
    editorRef.current?.notificationManager.open({
      text: 'README saved',
      type: 'success',
      timeout: 1000
    });
  }

  return (
    <div className={classNames("max-h-[500px] overflow-auto rounded-md", props.className)}>

      <div className={classNames("h-[450px] w-full animate-pulse bg-gray-300 rounded-md", { 'hidden': !loading })}>
        &nbsp;
      </div>
      <div className={classNames({ 'h-0': loading })}>
        <Editor
          id={EDITOR_ID}
          tinymceScriptSrc='/tinymce/tinymce.min.js'
          onInit={(evt, editor) => {
            editorRef.current = editor
            setLoading(false);
          }}
          disabled={props.readOnly}
          initialValue={value}
          onBlur={() => save()}
          onChange={() => save()}
          init={{
            height: 450,
            branding: false,
            statusbar: false,
            menubar: false,
            plugins: [
              'lists', 'link',
              'code', 'help', 'autosave',
              'table', 'save'
            ],
            setup: (e) => {
              e.ui.registry.addButton("profile", {
                icon: "user",
                onAction: () => {
                  router.push("/profile")
                },
              });
            },
            save_onsavecallback: manualSave,
            save_enablewhendirty: false,
            toolbar: `blocks | 
            bold italic forecolor | alignleft aligncenter 
            alignright alignjustify | profile | save | bullist numlist outdent indent | 
            removeformat | help`,
            content_style: `
            body { font-family:Helvetica,Arial,sans-serif; font-size:14px }
            pre {
              font-family: monospace;
              white-space: pre-wrap;
              padding: 8px;
            }`
          }}
        />
      </div>

    </div>

  );
} 
