import { Editor } from "@tinymce/tinymce-react";
import classNames from "classnames";
import { useRouter } from "next/router";
import { default as React, useState, useRef, useMemo, useEffect } from "react";
import { Editor as TinyMCEEditor } from 'tinymce';

interface EditorProps {
  initialData?: string;
  onChange?: (text: string) => void;
  /**
   * When this prop is changed, its value is appended to the editor's content.
   * Known bug that if the user selects an `appendData` value multiple times, it'll only paste the first time
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
    let out: string = props.initialData ?? '';
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
    <div className={classNames("max-h-[70vh] overflow-auto rounded-md", props.className)}>
      <div className={classNames("h-[70vh] w-full animate-pulse bg-gray-300 rounded-md", { 'hidden': !loading })}>
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
            height: '70vh',
            branding: false,
            placeholder: props.placeholder,
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
              //https://github.com/tinymce/tinymce-demos/blob/master/tinymce-basics/badges.html
              e.ui.registry.addIcon('badge', '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><g fill="none" fill-rule="evenodd" stroke="#000" stroke-width="2" transform="rotate(-45 11.894 11.644)"><path d="M5 7h10.343a3 3 0 0 1 2.121.879l3.415 3.414a.997.997 0 0 1 0 1.414l-3.415 3.414a3 3 0 0 1-2.12.879H5a.997.997 0 0 1-1-1V8a.997.997 0 0 1 1-1z"/><path stroke-linecap="round" transform="rotate(-135 15.828 12)" d="M16.414 11.414L15.707 12.121"/></g></svg>');
              e.ui.registry.addButton('badge', {
                icon: 'badge',
                tooltip: 'Insert/edit badge',
                onAction: function () {
                  const backgroundColor = function () {
                    let node: any = e.selection.getNode();
                    if (e.dom.hasClass(node, 'badge')) {
                      return node.style.backgroundColor;
                    }
                    return 'rgb(0, 123, 255)';
                  }

                  const textColor = function () {
                    let node: any = e.selection.getNode();
                    if (e.dom.hasClass(node, 'badge')) {
                      return node.style.color;
                    }
                    return 'rgb(255, 255, 255)';
                  }
                  e.windowManager.open({
                    title: 'Insert/edit Badge',
                    body: {
                      type: 'panel',
                      items: [
                        {
                          type: 'colorinput',
                          name: 'backgroundcolor',
                          label: 'Background color'
                        },
                        {
                          type: 'colorinput',
                          name: 'textcolor',
                          label: 'Text color'
                        }
                      ]
                    },
                    buttons: [
                      {
                        type: 'cancel',
                        name: 'closeButton',
                        text: 'Cancel'
                      },
                      {
                        type: 'submit',
                        name: 'submitButton',
                        text: 'Save',
                        primary: true
                      }
                    ],
                    initialData: {
                      backgroundcolor: backgroundColor(),
                      textcolor: textColor()
                    },
                    onSubmit: function (dialog) {
                      var data = dialog.getData();
                      const node = e.selection.getNode();
                      e.undoManager.transact(() => {
                        if (e.dom.hasClass(node, 'badge')) {
                          e.dom.setStyles(node, { 'background-color': data.backgroundcolor, 'color': data.textcolor });
                        }
                        else {
                          e.formatter.apply('badge', { styles: `background-color: ${data.backgroundcolor}; color: ${data.textcolor};` });
                        }
                      });
                      e.nodeChanged();
                      dialog.close();
                    }
                  });
                }
              });
            },
            save_onsavecallback: manualSave,
            save_enablewhendirty: false,
            inline_boundaries_selector: 'a[href],code,.mce-annotation,span.badge',
            formats: {
              badge: {
                inline: 'span',
                attributes: {
                  class: 'badge',
                  style: '%styles'
                },
              },
            },
            toolbar: `blocks | 
            bold italic forecolor backcolor | alignleft aligncenter 
            alignright alignjustify | profile save | table bullist numlist outdent indent |
            badge removeformat | help
            `,
            content_style: `
            body { font-family:Helvetica,Arial,sans-serif; font-size:14px }
            pre {
              font-family: monospace;
              white-space: pre-wrap;
              padding: 8px;
            }
            span.badge {
              background-color: gray;
              display: inline-block;
              background-color: #007bff;
              color: #fff;
              padding: 0px 4px;
              border-radius: 4px;
              font-weight: 600;
          }
            `
          }}
        />
      </div>
    </div>
  );
} 
