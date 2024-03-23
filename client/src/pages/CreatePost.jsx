import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Post a Review</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value='uncategorized'>Select Course Id</option>
            <option value="Math-143">Math-143</option>
            <option value="CSE-333">CSE-333</option>
            <option value="EE-181">EE-181</option>
            <option value="Math-141">Math-141</option>
            <option value="CSE-111">CSE-111</option>
            <option value="Chem-141">Chem-141</option>
            <option value="EE-281">EE-281</option>
            <option value="CSE-245">CSE-245</option>
            <option value="EE-283">EE-283</option>
            <option value="Math-243">Math-243</option>
            <option value="HUM-413">HUM-413</option>
            <option value="Math-241">Math-241</option>
            <option value="CSE-243">CSE-243</option>
            <option value="CSE-223">CSE-223</option>
            <option value="CSE-457">CSE-457</option>
            <option value="Phy-141">Phy-141</option>
            <option value="Phy-142">Phy-142</option>
            <option value="Hum-141">Hum-141</option>
            <option value="CSE-122">CSE-122</option>
            <option value="Hum-144">Hum-144</option>
            <option value="CSE-323">CSE-323</option>
            <option value="CSE-313">CSE-313</option>
            <option value="CSE-337">CSE-337</option>
            <option value="CSE-353">CSE-353</option>
            <option value="CSE-142">CSE-142</option>
            <option value="EE-182">EE-182</option>
            <option value="CSE-143">CSE-143</option>
            <option value="CSE-144">CSE-144</option>
            <option value="Chem-142">Chem-142</option>
            <option value="EE-282">EE-282</option>
            <option value="CSE-242">CSE-242</option>
            <option value="CSE-244">CSE-244</option>
            <option value="CSE-314">CSE-314</option>
            <option value="CSE-302">CSE-302</option>
            <option value="CSE-336">CSE-336</option>
            <option value="CSE-334">CSE-334</option>
            <option value="CSE-311">CSE-311</option>
            <option value="CSE-312">CSE-312</option>
            <option value="CSE-346">CSE-346</option>
            <option value="CSE-354">CSE-354</option>
            <option value="CSE-431">CSE-431</option>
            <option value="CSE-432">CSE-432</option>
            <option value="CSE-435">CSE-435</option>
            <option value="CSE-458">CSE-458</option>
            <option value="CSE-463">CSE-463</option>
            <option value="CSE-464">CSE-464</option>
            <option value="CSE-402">CSE-402</option>
            <option value="CSE-141">CSE-141</option>
            <option value="CSE-100">CSE-100</option>
            <option value="CSE-121">CSE-121</option>
            <option value="ME-246">ME-246</option>
            <option value="CSE-241">CSE-241</option>
            <option value="CSE-246">CSE-246</option>
            <option value="HUM-243">HUM-243</option>
            <option value="EE-284">EE-284</option>
            <option value="CSE-251">CSE-251</option>
            <option value="CSE-252">CSE-252</option>
            <option value="CSE-224">CSE-224</option>
            <option value="CSE-200">CSE-200</option>
            <option value="CSE-331">CSE-331</option>
            <option value="CSE-335">CSE-335</option>
            <option value="CSE-326">CSE-326</option>
            <option value="CSE-321">CSE-321</option>
            <option value="CSE-345">CSE-345</option>
            <option value="CSE-300">CSE-300</option>
            <option value="CSE-338">CSE-338</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
            onClick={handleUpdloadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )}
        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Publish
        </Button>
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}