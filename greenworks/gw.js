// Copyright (c) 2015 Greenheart Games Pty. Ltd. All rights reserved.
// Use of this source code is governed by the MIT license that can be
// found in the LICENSE file.
// The source code can be found in https://github.com/greenheartgames/greenworks

const fs = require("fs");
const gw = require("./gw-win32.node");
const nodeEvents = require("events");
const CIRCLE_RALLY_PARTY_APPID = 992950;

function error_process(err, error_callback) {
  if (err && error_callback) error_callback(err);
}

gw.ugcGetItems = function (
  options,
  ugc_matching_type,
  ugc_query_type,
  success_callback,
  error_callback
) {
  if (typeof options !== "object") {
    error_callback = success_callback;
    success_callback = ugc_query_type;
    ugc_query_type = ugc_matching_type;
    ugc_matching_type = options;
    options = {
      app_id: gw.getAppId(),
      page_num: 1,
    };
  }
  gw._ugcGetItems(
    options,
    ugc_matching_type,
    ugc_query_type,
    success_callback,
    error_callback
  );
};

gw.ugcGetUserItems = function (
  options,
  ugc_matching_type,
  ugc_list_sort_order,
  ugc_list,
  success_callback,
  error_callback
) {
  if (typeof options !== "object") {
    error_callback = success_callback;
    success_callback = ugc_list;
    ugc_list = ugc_list_sort_order;
    ugc_list_sort_order = ugc_matching_type;
    ugc_matching_type = options;
    options = {
      app_id: gw.getAppId(),
      page_num: 1,
    };
  }
  gw._ugcGetUserItems(
    options,
    ugc_matching_type,
    ugc_list_sort_order,
    ugc_list,
    success_callback,
    error_callback
  );
};

gw.ugcSynchronizeItems = function (
  options,
  sync_dir,
  success_callback,
  error_callback
) {
  if (typeof options !== "object") {
    error_callback = success_callback;
    success_callback = sync_dir;
    sync_dir = options;
    options = {
      app_id: gw.getAppId(),
      page_num: 1,
    };
  }
  gw._ugcSynchronizeItems(options, sync_dir, success_callback, error_callback);
};

gw.publishWorkshopFile = function (
  options,
  file_path,
  image_path,
  title,
  description,
  success_callback,
  error_callback
) {
  if (typeof options !== "object") {
    error_callback = success_callback;
    success_callback = description;
    description = title;
    title = image_path;
    image_path = file_path;
    file_path = options;
    options = {
      app_id: gw.getAppId(),
      tags: [],
    };
  }
  gw._publishWorkshopFile(
    options,
    file_path,
    image_path,
    title,
    description,
    success_callback,
    error_callback
  );
};

gw.updatePublishedWorkshopFile = function (
  options,
  published_file_handle,
  file_path,
  image_path,
  title,
  description,
  success_callback,
  error_callback
) {
  if (typeof options !== "object") {
    error_callback = success_callback;
    success_callback = description;
    description = title;
    title = image_path;
    image_path = file_path;
    file_path = published_file_handle;
    published_file_handle = options;
    options = {
      tags: [], // No tags are set
    };
  }
  gw._updatePublishedWorkshopFile(
    options,
    published_file_handle,
    file_path,
    image_path,
    title,
    description,
    success_callback,
    error_callback
  );
};

// An utility function for publish related APIs.
// It processes remains steps after saving files to Steam Cloud.
function file_share_process(
  file_name,
  image_name,
  next_process_func,
  error_callback,
  progress_callback
) {
  if (progress_callback)
    progress_callback("Completed on saving files on Steam Cloud.");
  gw.fileShare(
    file_name,
    function () {
      gw.fileShare(
        image_name,
        function () {
          next_process_func();
        },
        function (err) {
          error_process(err, error_callback);
        }
      );
    },
    function (err) {
      error_process(err, error_callback);
    }
  );
}

// Publishing user generated content(ugc) to Steam contains following steps:
// 1. Save file and image to Steam Cloud.
// 2. Share the file and image.
// 3. publish the file to workshop.
gw.ugcPublish = function (
  file_name,
  title,
  description,
  image_name,
  success_callback,
  error_callback,
  progress_callback
) {
  var publish_file_process = function () {
    if (progress_callback) progress_callback("Completed on sharing files.");
    gw.publishWorkshopFile(
      file_name,
      image_name,
      title,
      description,
      function (publish_file_id) {
        success_callback(publish_file_id);
      },
      function (err) {
        error_process(err, error_callback);
      }
    );
  };
  gw.saveFilesToCloud(
    [file_name, image_name],
    function () {
      file_share_process(
        file_name,
        image_name,
        publish_file_process,
        error_callback,
        progress_callback
      );
    },
    function (err) {
      error_process(err, error_callback);
    }
  );
};

// Update publish ugc steps:
// 1. Save new file and image to Steam Cloud.
// 2. Share file and images.
// 3. Update published file.
gw.ugcPublishUpdate = function (
  published_file_id,
  file_name,
  title,
  description,
  image_name,
  success_callback,
  error_callback,
  progress_callback
) {
  var update_published_file_process = function () {
    if (progress_callback) progress_callback("Completed on sharing files.");
    gw.updatePublishedWorkshopFile(
      published_file_id,
      file_name,
      image_name,
      title,
      description,
      function () {
        success_callback();
      },
      function (err) {
        error_process(err, error_callback);
      }
    );
  };

  gw.saveFilesToCloud(
    [file_name, image_name],
    function () {
      file_share_process(
        file_name,
        image_name,
        update_published_file_process,
        error_callback,
        progress_callback
      );
    },
    function (err) {
      error_process(err, error_callback);
    }
  );
};

// Greenworks Utils APIs implementation.
gw.Utils.move = function (
  source_dir,
  target_dir,
  success_callback,
  error_callback
) {
  fs.rename(source_dir, target_dir, function (err) {
    if (err) {
      if (error_callback) error_callback(err);
      return;
    }
    if (success_callback) success_callback();
  });
};

gw.init = function () {
  if (this.initAPI()) {
    console.info("Steam initialization successfull");
    return true;
  }

  if (!this.isSteamRunning()) {
    console.error("Steam initialization failed. Steam is not running.");
    return false;
  }

  const appId = CIRCLE_RALLY_PARTY_APPID;

  try {
    appId = circleRallyPartyAppId;
  } catch (e) {
    console.error(
      "Steam initialization failed. Steam is running," +
        "but steam_appid.txt is missing. Expected to find it in: " +
        require("path").resolve("steam_appid.txt")
    );

    return false;
  }
  if (!/^\d+ *\r?\n?$/.test(appId)) {
    console.error(
      "Steam initialization failed. " +
        "steam_appid.txt appears to be invalid; " +
        "it should contain a numeric ID: " +
        appId
    );

    return false;
  }

  console.error(
    "Steam initialization failed, but Steam is running, " +
      "and steam_appid.txt is present and valid." +
      "Maybe that's not really YOUR app ID? " +
      appId.trim()
  );

  return false;
};

const EventEmitter = nodeEvents.EventEmitter;
gw.__proto__ = EventEmitter.prototype;
EventEmitter.call(gw);

gw._steam_events.on = function () {
  gw.emit.apply(gw, arguments);
};

process.versions["greenworks"] = gw._version;

module.exports = gw;
