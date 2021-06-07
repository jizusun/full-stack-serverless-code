import { useEffect, useReducer, useState } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Storage, API } from 'aws-amplify';
import { v4 as uuid } from 'uuid';
import { List, Input, Button } from 'antd';
import { listVideos } from './graphql/queries';
import {
  createVideo,
  deleteVideo,
  updateVideo,
} from './graphql/mutations';

const initialState = {
  videos: [],
  loading: true,
  error: false,
  form: { name: '', description: '' },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_VIDEOS':
      return { ...state, videos: action.videos, loading: false };
    default:
      return state;
  }
};

const Video = (props) => {
  // const [video, setVideo] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    fetchVideos();
  }, []);

  async function fetchVideos() {
    try {
      const videosData = await API.graphql({
        query: listVideos,
      });
      dispatch({
        type: 'SET_VIDEOS',
        videos: videosData.data.listVideos.items,
      });
    } catch (err) {
      console.log('error: ', err);
      dispatch({ type: 'ERROR' });
    }
    // const files = await Storage.list('');
    // const signedFiles = await Promise.all(
    //   files.map(async (file) => {
    //     const signedFile = await Storage.get(file.key);
    //     return signedFile;
    //   })
    // );
    // setVideo(signedFiles);
  }

  async function onChange(e) {
    const file = e.target.files[0];
    const filetype = file.name.split('.')[file.name.split.length - 1];
    await Storage.put(`${uuid()}.${filetype}`, file);
    fetchVideos();
  }

  const renderItem = (item) => {
    return (
      <List.Item actions={[<p>Delete</p>]}>
        <List.Item.Meta
          title={item.name}
          description={item.description}
        />
      </List.Item>
    );
  };

  return (
    <div>
      <List
        loading={state.loading}
        dataSource={state.videos}
        renderItem={renderItem}
      />
      <header>
        <input type="file" onChange={onChange} />
        <ul>
          {state.videos.map((v) => (
            <li key={v}>
              <img src={v} key={v} style={{ width: 500 }} alt={v} />
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
};

export default withAuthenticator(Video);
