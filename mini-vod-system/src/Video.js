import { useEffect, useState } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Storage } from 'aws-amplify';
import { v4 as uuid } from 'uuid';

const Video = (props) => {
  const [video, setVideo] = useState([]);
  useEffect(() => {
    fetchVideo();
  }, []);

  async function fetchVideo() {
    const files = await Storage.list('');
    const signedFiles = await Promise.all(
      files.map(async (file) => {
        const signedFile = await Storage.get(file.key);
        return signedFile;
      })
    );
    setVideo(signedFiles);
  }

  async function onChange(e) {
    const file = e.target.files[0];
    const filetype = file.name.split('.')[file.name.split.length - 1];
    await Storage.put(`${uuid()}.${filetype}`, file);
    fetchVideo();
  }
  return (
    <div>
      <header>
        <input type="file" onChange={onChange} />
        <ul>
          {video.map((v) => (
            <li>
              <img src={v} key={v} style={{ width: 500 }} alt={v} />
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
};

export default withAuthenticator(Video);
