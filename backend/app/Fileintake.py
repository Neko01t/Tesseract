import tkinter as tk
from tkinter import ttk, filedialog, messagebox
import os

class SimpleFileUpload:
    def __init__(self, root):
        self.root = root
        self.root.title("File Upload")
        self.root.geometry("500x400")
        self.root.configure(bg='#f0f2f5')
        
        # Store selected files
        self.selected_files = []
        
        self.create_ui()
    
    def create_ui(self):
        # Main container
        main_frame = ttk.Frame(self.root, padding="30")
        main_frame.pack(fill=tk.BOTH, expand=True)
        
        # Title
        title_label = ttk.Label(
            main_frame,
            text="File Upload",
            font=('Arial', 24, 'bold'),
            foreground='#2c3e50'
        )
        title_label.pack(pady=(0, 10))
        
        # Upload box
        self.create_upload_box(main_frame)
        
        # Button frame
        self.create_buttons(main_frame)
        
        # File list
        self.create_file_list(main_frame)
    
    def create_upload_box(self, parent):
        # Upload box with modern styling
        self.upload_frame = tk.Frame(
            parent,
            bg='#ffffff',
            relief='solid',
            borderwidth=2,
            highlightbackground='#3498db',
            highlightthickness=1,
            cursor='hand2'
        )
        self.upload_frame.pack(fill=tk.X, pady=(0, 20))
        self.upload_frame.pack_propagate(False)
        self.upload_frame.configure(height=100)
        
        # Make the frame clickable for browsing
        self.upload_frame.bind('<Button-1>', self.browse_files)
        self.upload_frame.bind('<Enter>', lambda e: self.upload_frame.configure(bg='#f8f9fa'))
        self.upload_frame.bind('<Leave>', lambda e: self.upload_frame.configure(bg='#ffffff'))
        
        # Upload content
        upload_content = tk.Frame(self.upload_frame, bg='#ffffff')
        upload_content.place(relx=0.5, rely=0.5, anchor='center')
        
        # Upload icon and text
        upload_icon = tk.Label(
            upload_content,
            text="📁",
            font=('Arial', 20),
            bg='#ffffff',
            fg='#3498db'
        )
        upload_icon.pack()
        
        upload_text = tk.Label(
            upload_content,
            text="Click here to browse files",
            font=('Arial', 11),
            bg='#ffffff',
            fg='#7f8c8d'
        )
        upload_text.pack(pady=5)
    
    def create_buttons(self, parent):
        # Button container
        button_frame = ttk.Frame(parent)
        button_frame.pack(fill=tk.X, pady=(0, 15))
        
        # Browse button
        self.browse_btn = ttk.Button(
            button_frame,
            text=" Browse Files",
            command=self.browse_files,
            style='Secondary.TButton'
        )
        self.browse_btn.pack(side=tk.LEFT, padx=(0, 10))
        
        # Upload button
        self.upload_btn = ttk.Button(
            button_frame,
            text=" Upload Files",
            command=self.upload_files,
            style='Primary.TButton'
        )
        self.upload_btn.pack(side=tk.LEFT)
        
        # Clear button
        self.clear_btn = ttk.Button(
            button_frame,
            text=" Clear All",
            command=self.clear_files,
            style='Secondary.TButton'
        )
        self.clear_btn.pack(side=tk.RIGHT)
    
    def create_file_list(self, parent):
        # File list frame
        list_frame = ttk.Frame(parent)
        list_frame.pack(fill=tk.BOTH, expand=True)
        
        # List label
        list_label = ttk.Label(
            list_frame,
            text="Selected Files:",
            font=('Arial', 11, 'bold'),
            foreground='#2c3e50'
        )
        list_label.pack(anchor='w', pady=(0, 5))
        
        # Listbox with scrollbar
        listbox_frame = ttk.Frame(list_frame)
        listbox_frame.pack(fill=tk.BOTH, expand=True)
        
        self.scrollbar = ttk.Scrollbar(listbox_frame)
        self.scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        
        self.file_listbox = tk.Listbox(
            listbox_frame,
            yscrollcommand=self.scrollbar.set,
            font=('Arial', 10),
            bg='#ffffff',
            relief='solid',
            borderwidth=1,
            highlightthickness=0
        )
        self.file_listbox.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        self.scrollbar.config(command=self.file_listbox.yview)
        
        # Bind double-click to remove file
        self.file_listbox.bind('<Double-1>', self.remove_file)
    
    def browse_files(self, event=None):
        """Browse and select files from computer"""
        files = filedialog.askopenfilenames(
            title="Select Files to Upload",
            filetypes=[
                ("All files", "*.*"),
                ("Text files", "*.txt"),
                ("PDF files", "*.pdf"),
                ("Images", "*.jpg *.jpeg *.png *.gif"),
                ("Word documents", "*.doc *.docx"),
                ("Excel files", "*.xls *.xlsx")
            ]
        )
        
        if files:
            self.add_files(files)
            messagebox.showinfo("Files Selected", f"Added {len(files)} file(s) to upload list!")
    
    def add_files(self, files):
        """Add selected files to the list"""
        for file_path in files:
            if file_path not in self.selected_files:
                self.selected_files.append(file_path)
                filename = os.path.basename(file_path)
                # Add file size info
                file_size = os.path.getsize(file_path)
                size_kb = file_size / 1024
                if size_kb < 1024:
                    size_text = f"{size_kb:.1f} KB"
                else:
                    size_text = f"{size_kb/1024:.1f} MB"
                
                display_text = f"📄 {filename} ({size_text})"
                self.file_listbox.insert(tk.END, display_text)
        
        self.update_ui()
    
    def remove_file(self, event):
        """Remove selected file from list"""
        selection = self.file_listbox.curselection()
        if selection:
            index = selection[0]
            removed_file = self.selected_files.pop(index)
            self.file_listbox.delete(index)
            self.update_ui()
    
    def clear_files(self):
        """Clear all files from the list"""
        if self.selected_files:
            if messagebox.askyesno("Clear Files", "Are you sure you want to clear all files?"):
                self.selected_files.clear()
                self.file_listbox.delete(0, tk.END)
                self.update_ui()
    
    def update_ui(self):
        """Update UI based on current file selection"""
        file_count = len(self.selected_files)
        
        if file_count > 0:
            self.upload_btn.config(text=f"⬆️ Upload {file_count} File(s)")
            self.upload_btn.state(['!disabled'])
        else:
            self.upload_btn.config(text="⬆️ Upload Files")
            self.upload_btn.state(['disabled'])
    
    def upload_files(self):
        """Upload selected files"""
        if not self.selected_files:
            messagebox.showwarning("No Files", "Please select files first!")
            return
        
        # Show upload progress
        self.show_upload_progress()
    
    def show_upload_progress(self):
        """Show upload progress window"""
        # Create progress window
        progress_window = tk.Toplevel(self.root)
        progress_window.title("Uploading Files")
        progress_window.geometry("400x250")
        progress_window.configure(bg='#ffffff')
        progress_window.transient(self.root)
        progress_window.grab_set()
        
        # Center the window
        progress_window.update_idletasks()
        x = self.root.winfo_x() + (self.root.winfo_width() - progress_window.winfo_width()) // 2
        y = self.root.winfo_y() + (self.root.winfo_height() - progress_window.winfo_height()) // 2
        progress_window.geometry(f"+{x}+{y}")
        
        # Progress content
        tk.Label(
            progress_window,
            text="📤 Uploading Files",
            font=('Arial', 16, 'bold'),
            bg='#ffffff',
            fg='#2c3e50'
        ).pack(pady=20)
        
        # Progress bar
        progress = ttk.Progressbar(
            progress_window,
            orient=tk.HORIZONTAL,
            length=300,
            mode='determinate'
        )
        progress.pack(pady=10)
        
        # Status label
        status_label = tk.Label(
            progress_window,
            text="Starting upload...",
            font=('Arial', 10),
            bg='#ffffff',
            fg='#7f8c8d'
        )
        status_label.pack(pady=5)
        
        # Current file label
        current_file_label = tk.Label(
            progress_window,
            text="",
            font=('Arial', 9),
            bg='#ffffff',
            fg='#3498db'
        )
        current_file_label.pack(pady=5)
        
        # Start upload process
        self.start_upload(progress, status_label, current_file_label, progress_window, 0)
    
    def start_upload(self, progress, status_label, file_label, window, current_index):
        """Start the actual upload process"""
        if current_index < len(self.selected_files):
            # Get current file
            file_path = self.selected_files[current_index]
            filename = os.path.basename(file_path)
            
            # Update progress
            progress_percent = (current_index + 1) / len(self.selected_files) * 100
            progress['value'] = progress_percent
            
            status_label.config(text=f"Uploading {current_index + 1} of {len(self.selected_files)} files")
            file_label.config(text=f"Current: {filename}")
            
            # ACTUAL UPLOAD LOGIC GOES HERE 
            upload_success = self.upload_single_file(file_path)
            
            if upload_success:
                # Continue with next file
                window.after(1000, lambda: self.start_upload(progress, status_label, file_label, window, current_index + 1))
            else:
                messagebox.showerror("Upload Failed", f"Failed to upload: {filename}")
                window.destroy()
        else:
            # Upload complete
            window.destroy()
            messagebox.showinfo(
                "Upload Complete", 
                f" Successfully uploaded {len(self.selected_files)} files!"
            )
            
            # Clear files after successful upload
            self.selected_files.clear()
            self.file_listbox.delete(0, tk.END)
            self.update_ui()
    
    def upload_single_file(self, file_path):
        """
         ACTUAL FILE UPLOAD FUNCTION
        Replace this with your real upload logic
        """
        try:
            filename = os.path.basename(file_path)
            file_size = os.path.getsize(file_path)
            
            print(f" Uploading: {filename}")
            print(f" File size: {file_size} bytes")
            print(f" File path: {file_path}")
            
            #  REPLACE THIS WITH YOUR ACTUAL UPLOAD CODE 
            # Example upload code (uncomment and modify as needed):
            
            # Method 1: HTTP Upload
            # import requests
            # with open(file_path, 'rb') as f:
            #     files = {'file': (filename, f)}
            #     response = requests.post('YOUR_UPLOAD_URL', files=files)
            # return response.status_code == 200
            
            # Method 2: FTP Upload
            # import ftplib
            # ftp = ftplib.FTP('YOUR_FTP_SERVER')
            # ftp.login('username', 'password')
            # with open(file_path, 'rb') as f:
            #     ftp.storbinary(f'STOR {filename}', f)
            # ftp.quit()
            
            # Method 3: Copy to another directory (local example)
            # import shutil
            # destination = "C:/Uploads/"  # Change this path
            # shutil.copy2(file_path, destination)
            
            # For now, just simulate successful upload
            # Remove this sleep in real implementation
            import time
            time.sleep(1)  # Simulate upload time
            
            print(f" Uploaded: {filename}")
            return True
            
        except Exception as e:
            print(f" Upload failed: {str(e)}")
            return False

def main():
    root = tk.Tk()
    
    # Configure modern styles
    style = ttk.Style()
    
    # Primary button style (Upload)
    style.configure('Primary.TButton', 
                   font=('Arial', 11, 'bold'),
                   padding=(15, 8),
                   background='#3498db',
                   forground = '#3498db')
    
    # Secondary button style (Browse, Clear)
    style.configure('Secondary.TButton', 
                   font=('Arial', 10),
                   padding=(12, 6),
                   background='#95a5a6',
                   foreground='#3498db')
    
    app = SimpleFileUpload(root)
    root.mainloop()

if __name__ == "__main__":
    main()