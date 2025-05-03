"use client"

import { FaBold, FaItalic, FaStrikethrough  } from "react-icons/fa6";
import { MdFormatListBulleted, MdFormatUnderlined, MdOutlineImage } from "react-icons/md";
import { AiOutlineOrderedList } from "react-icons/ai";
import { RiMenu2Fill, RiMenu3Fill, RiMenu5Fill } from "react-icons/ri";
import { TbBallpenOff, TbLink, TbLinkOff } from "react-icons/tb";
import Upload from "../../../assets/upload.png";
import toast, { Toaster } from "react-hot-toast";
import { MdPreview } from "react-icons/md";

import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import ImageResize from "tiptap-extension-resize-image";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import FontFamily from "@tiptap/extension-font-family";
import Gapcursor from "@tiptap/extension-gapcursor";
import TextStyle from "@tiptap/extension-text-style";
import { HexColorPicker } from "react-colorful";
import Preview from "@/components/ui/Preview";
import { Modal } from "@mui/material";

const fonts = [
  { label: "Inter", value: "Inter" },
  { label: "Comic Sans", value: '"Comic Sans MS", "Comic Sans"' },
  { label: "Serif", value: "serif" },
  { label: "Monospace", value: "monospace" },
  { label: "Cursive", value: "cursive" },
  { label: "CSS Variable", value: "var(--title-font-family)" },
  { label: "Exo 2", value: '"Exo 2"' },
  { label: "Arial", value: "Arial" },
  { label: "Helvetica", value: "Helvetica" },
  { label: "Verdana", value: "Verdana" },
  { label: "Tahoma", value: "Tahoma" },
  { label: "Trebuchet MS", value: "Trebuchet MS" },
  { label: "Geneva", value: "Geneva" },
  { label: "Times New Roman", value: '"Times New Roman", Times, serif' },
  { label: "Georgia", value: "Georgia" },
  { label: "Garamond", value: "Garamond" },
  { label: "Palatino", value: "Palatino" },
  { label: "Bookman", value: "Bookman" },
  { label: "Courier New", value: '"Courier New", Courier, monospace' },
  { label: "Lucida Console", value: "Lucida Console, Monaco, monospace" },
  { label: "Monaco", value: "Monaco" },
  { label: "Consolas", value: "Consolas" },
  { label: "Brush Script", value: '"Brush Script MT", cursive' },
  { label: "Impact", value: "Impact, fantasy" },
];

const categories = [
    "Others",
    "Study Tips",
    "Productivity",
    "Study Skills",
    "Mental Health",
    "Technology",
  ]

const Editor = () => {

  const editor = useEditor({
    extensions: [
      // Core extensions first
      Document,
      Text,
      Paragraph,
      
      // Configure list-related extensions together before StarterKit
      ListItem.configure({
        HTMLAttributes: {
          class: 'list-item',
        },
      }),
      BulletList.configure({
        keepMarks: true,
        keepAttributes: true,
        HTMLAttributes: {
          class: 'bullet-list',
        },
      }),
      OrderedList.configure({
        keepMarks: true,
        keepAttributes: true,
        HTMLAttributes: {
          class: 'ordered-list',
        },
      }),
      
      // StarterKit with list extensions disabled and heading handled separately
      StarterKit.configure({
        heading: false, // Disable built-in heading
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      
      // Explicitly configure the Heading extension
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
        HTMLAttributes: {
          class: 'editor-heading',
        },
      }),
      
      // Rest of the extensions
      Gapcursor,
      TextStyle,
      Underline,
      FontFamily,
      Highlight.configure({multicolor: true}),
      Image,
      TextAlign.configure({ 
        types: ["heading", "paragraph", "bulletList", "orderedList", "listItem"] 
      }),
      ImageResize,
      
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
          try {
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)

            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false
            }

            const disallowedProtocols = ['ftp', 'file', 'mailto']
            const protocol = parsedUrl.protocol.replace(':', '')

            if (disallowedProtocols.includes(protocol)) {
              return false
            }

            const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))

            if (!allowedProtocols.includes(protocol)) {
              return false
            }

            const disallowedDomains = ['https://www.4chan.org']
            const domain = parsedUrl.hostname

            if (disallowedDomains.includes(domain)) {
              return false
            }

            return true
          } catch {
            return false
          }
        },
        shouldAutoLink: url => {
          try {
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)

            const disallowedDomains = ['https://www.4chan.org']
            const domain = parsedUrl.hostname

            return !disallowedDomains.includes(domain)
          } catch {
            return false
          }
        },
      }),
    ],
    content: "<p></p>",
    onUpdate: ({ editor }) => {
      // This helps debug any issues with the editor
      console.log('Editor content:', editor.getHTML());
      setContent(editor.getHTML());
    },
    // Add editor styling options
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none tiptap',
      },
    },
  });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Others');
  const [author, setAuthor] = useState('');
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the first file from the input
    if (file) {
      setImage(file); // Store the file in the state
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result); // Set the preview to the uploaded image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = editor?.getHTML() || ""; // Get the HTML content from the editor
    console.log("Image:", image);
    console.log("Title:", title);
    console.log("Content:", content);
    console.log("Category:", category);
    console.log("Author:", author);
    if (!image || !title || !content || !category || !author) {
      toast.error("Please fill in all fields and select an image.");
      return;
    }

    // Create FormData for file upload
    const formData = new FormData();
    formData.append('image', image); // Append the file to FormData
    formData.append('title', title); // Append the title
    formData.append('content', content); // Append the content
    formData.append('category', category); // Append the category
    formData.append('author', author); // Append the author

    try {
      // Use FormData for uploading files
      const response = await fetch('/api/blogs', {
        method: 'POST',
        body: formData, // Send the FormData directly
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Blog uploaded successfully!');
      } else {
        console.error('Error uploading blog:', data.error);
      }
    } catch (error) {
      console.error('Error uploading blog:', error);
      toast.error("Error uploading blog. Don't insert pictures larger than 1mb in content.");
    }
  };

  const [highlightColor, setHighlightColor] = React.useState("#ff0000");
  const [showPicker, setShowPicker] = React.useState(false);


  const setLink = () => {
    const previousUrl = editor?.getAttributes("link").href; 
    const url = window.prompt("Enter the URL", previousUrl || "https://");
  
    if (url === null || url.trim() === "") return;
  
    const validUrl = url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
  
    editor?.chain().focus().extendMarkRange("link").setLink({ href: validUrl }).run();
  };
  
  const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFont = event.target.value;
    if (selectedFont) {
      editor?.chain().focus().setFontFamily(selectedFont).run();
    }
  };

  if (!editor) {
    return null;
  }

  const addImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      editor?.chain().focus().setImage({ src: base64 }).run();
    };
    reader.readAsDataURL(file);
  };

  const jsonContent = editor.getJSON();

  const handlePreview = () => {
    setPreviewOpen(true);
    toast.success("Preview opened!");
  };

  return (
    <div className="border py-4 w-full">
      <style jsx global>{`
        /* TipTap editor styles based on documentation */
        .tiptap {
          :first-child {
            margin-top: 0;
          }
        }
        
        /* Heading styles */
        .tiptap h1,
        .tiptap h2,
        .tiptap h3,
        .tiptap h4,
        .tiptap h5,
        .tiptap h6 {
          line-height: 1.1;
          margin-top: 2.5rem;
          text-wrap: pretty;
        }

        .tiptap h1,
        .tiptap h2 {
          margin-top: 3.5rem;
          margin-bottom: 1.5rem;
        }

        .tiptap h1 {
          font-size: 1.4rem;
        }

        .tiptap h2 {
          font-size: 1.2rem;
        }

        .tiptap h3 {
          font-size: 1.1rem;
        }

        .tiptap h4,
        .tiptap h5,
        .tiptap h6 {
          font-size: 1rem;
        }
        
        /* Direct element styling - more reliable than classes */
        .ProseMirror h1 {
          font-size: 1.8rem !important;
          font-weight: bold !important;
          margin-top: 2.5rem !important;
          margin-bottom: 1rem !important;
          line-height: 1.1 !important;
        }
        
        .ProseMirror h2 {
          font-size: 1.5rem !important;
          font-weight: bold !important;
          margin-top: 2rem !important;
          margin-bottom: 0.75rem !important;
          line-height: 1.1 !important;
        }
        
        .ProseMirror h3 {
          font-size: 1.3rem !important;
          font-weight: bold !important;
          margin-top: 1.5rem !important;
          margin-bottom: 0.5rem !important;
          line-height: 1.1 !important;
        }
        
        .ProseMirror h4 {
          font-size: 1.1rem !important;
          font-weight: bold !important;
          margin-top: 1.25rem !important;
          margin-bottom: 0.5rem !important;
          line-height: 1.1 !important;
        }
        
        .ProseMirror h5 {
          font-size: 1rem !important;
          font-weight: bold !important;
          margin-top: 1rem !important;
          margin-bottom: 0.5rem !important;
          line-height: 1.1 !important;
        }
        
        .ProseMirror h6 {
          font-size: 0.9rem !important;
          font-weight: bold !important;
          margin-top: 1rem !important;
          margin-bottom: 0.5rem !important;
          line-height: 1.1 !important;
        }
        
        /* List styling - more specific and forceful */
        .ProseMirror ul {
          list-style-type: disc !important;
          padding-left: 1.5em !important;
          margin: 1em 0 !important;
        }
        
        .ProseMirror ol {
          list-style-type: decimal !important;
          padding-left: 1.5em !important;
          margin: 1em 0 !important;
        }
        
        .ProseMirror li {
          display: list-item !important;
          padding: 0.2em 0 !important;
        }
        
        /* Ensure paragraphs inside list items are properly spaced */
        .ProseMirror li p {
          margin: 0 !important;
          display: inline !important;
        }
        
        /* General content styling */
        .ProseMirror p {
          margin: 0.8em 0 !important;
        }
        
        .ProseMirror {
          min-height: 100px;
          padding: 0.5em !important;
        }
        
        /* Ensure the active bullet/numbering is visible immediately */
        .ProseMirror ul li::marker,
        .ProseMirror ol li::marker {
          display: inline !important;
          color: currentColor !important;
        }
      `}</style>
      <Toaster/>
      <div className="w-[80%] mx-auto mb-2 font-bold text-2xl text-start">
        Content
      </div>
      <div className={`sticky top-0 border-t border-b border-r z-10 mb-2 flex items-center justify-evenly w-[100%] bg-gray-100 py-1 px-2`}>
        <select
          onChange={(e) => {
            const level = parseInt(e.target.value);
            if (level) {
              editor.chain().focus().toggleHeading({ level: level as any }).run();
            }
          }}
          defaultValue=""
          className="hover:bg-white bg-inherit focus:outline-none rounded"
        >
          <option value="">Normal Text</option>
          <option value="1">H1</option>
          <option value="2">H2</option>
          <option value="3">H3</option>
          <option value="4">H4</option>
          <option value="5">H5</option>
          <option value="6">H6</option>
        </select>
        <div className="px-2 border-r border-l">
          <link
            href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap"
            rel="stylesheet"
          />
          <div className="control-group">
            <select onChange={handleFontChange} defaultValue="" className="hover:bg-white bg-inherit rounded focus:outline-none">
              <option value="" disabled>Select Font</option>
              {fonts.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          <FaBold />
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          <FaItalic />
        </button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()}>
          <FaStrikethrough />
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className="border-r pr-2">
          <MdFormatUnderlined fontSize={20}/>
        </button>
        <div style={{ position: "relative", display: "inline-block" }}>
          <button
            style={{
              backgroundColor: highlightColor,
              width: "20px", 
              height: "20px", 
              borderRadius: "50%", 
              border: "2px solid #ccc", 
              cursor: "pointer",
              marginTop: "2px",
            }}
            onClick={() => {
              setShowPicker(!showPicker); 
              editor.chain().focus().toggleHighlight({ color: highlightColor }).run()
            }}
            className={editor.isActive('highlight', { color: highlightColor }) ? 'is-active' : ''}
          >
          </button>
          {showPicker && (
            <div
              style={{
                position: "absolute",
                top: "100%", 
                left: "50%",
                transform: "translateX(-50%)", 
                zIndex: 1000, 
                marginTop: "8px", 
                background: "#fff",
                padding: "10px",
                borderRadius: "8px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <HexColorPicker color={highlightColor} onChange={setHighlightColor} />
            </div>
          )}
        </div>
        <button
          onClick={() => editor.chain().focus().unsetHighlight().run()}
          disabled={!editor.isActive('highlight')}
          className=""
        >
          <TbBallpenOff fontSize={20}/>
        </button>
        <label className="cursor-pointer">
          <MdOutlineImage fontSize={20}/>
          <input type="file" accept="image/*" onChange={addImage} className="hidden" />
        </label>
        <button onClick={setLink} className={editor.isActive("link") ? "is-active" : ""}>
          <TbLink fontSize={20}/>
        </button>
        <button onClick={() => editor.chain().focus().unsetLink().run()} disabled={!editor.isActive("link")} className="border-r pr-2">
          <TbLinkOff fontSize={20}/>
        </button>
        <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
          >
            <RiMenu2Fill fontSize={20}/>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
          >
            <RiMenu5Fill fontSize={20}/>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
          >
            <RiMenu3Fill fontSize={20}/>
          </button>
        <button 
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${editor.isActive('bulletList') ? 'bg-blue-200 rounded' : ''}`}
        >
          <MdFormatListBulleted fontSize={20}/>
        </button>
        <button 
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${editor.isActive('orderedList') ? 'bg-blue-200 rounded' : ''}`}
        >
          <AiOutlineOrderedList fontSize={20}/>
        </button>
        <button 
          onClick={() => console.log('Editor state:', editor.getJSON())}
          className="ml-2 text-xs text-gray-500"
          title="Debug - Print editor state to console"
        >
          Debug
        </button>
      </div>
      <div className="w-[80%] mx-auto border border-gray-300 rounded-md min-h-[300px] mb-6 relative">
        <div className="p-4 min-h-[300px] cursor-text" onClick={() => editor.chain().focus().run()}>
          <EditorContent editor={editor} />
        </div>
        {editor && !editor.isFocused && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none">
            
          </div>
        )}
      </div>
      <div className="w-[80%] mx-auto mt-3 font-bold text-2xl text-start">
        Title
      </div>
      <div className="w-[80%] mx-auto mt-3 flex flex-row">
        <input
          value={title}
          onChange={handleInputChange}
          placeholder="Enter title here..."
          className="border w-[80%] h-10 px-2"
        />
        <div className="w-[20%] border flex justify-center items-center">
            <select 
                className="category w-[75%]"
                value={category}
                onChange={handleCategoryChange}
            >
                {categories.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
      </div>
      <div className="w-[80%] mx-auto mt-3 font-bold text-2xl text-start">
        Author
      </div>
      <div className="w-[80%] mx-auto mt-3 flex flex-row">
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter author name here..."
          className="border w-full h-10 px-2"
        />
      </div>
      <div className="w-[80%] mx-auto mt-3 font-bold text-2xl text-start">
        Cover Image
      </div>
      <label
        className="flex flex-row justify-center items-center w-[80%] h-[8rem] mx-auto mt-3 border cursor-pointer"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <img
          src={(typeof imagePreview === 'string' ? imagePreview : Upload.src)}
          alt="Preview"
          className="w-[8rem] h-[8rem]" // Ensure the image covers the container
        />
      </label>
      <div className="w-[80%] mx-auto mt-3 flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 w-[90%] hover:bg-blue-700 cursor-pointer text-black py-2 rounded"
        >
          Submit
        </button>
        <button onClick={handlePreview} className="w-[10%] flex justify-center items-center bg-white text-black border hover:bg-gray-200 cursor-pointer py-2 rounded ml-2">
          <MdPreview fontSize={25}/>
        </button>
      </div>
        <Modal
          open={previewOpen}
          onClose={() => setPreviewOpen(false)}
          className="flex items-center justify-center w-[90%] h-[90%] mx-auto my-auto"
        >
          <Preview blog={{ image: (imagePreview as string) || null, title, content: editor.getHTML(), category }} />
        </Modal>
    </div>
  );
};

export default Editor;